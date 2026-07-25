package it.paradisolounge.admin

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.telephony.SmsManager
import android.telephony.SubscriptionManager
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale

private const val SMS_PREFERENCES = "paradiso_sms_gateway"
private const val SMS_ENABLED = "enabled"
private const val SMS_CONFIGURED = "configured"
private const val SENT_BOOKING_IDS = "sent_booking_ids"
private const val MAX_SAVED_BOOKING_IDS = 100

enum class SmsGatewayResult {
    QUEUED,
    ALREADY_SENT,
    DISABLED,
    PERMISSION_MISSING,
    NO_TELEPHONY,
    INVALID_DESTINATION,
    FAILED,
}

object SmsGateway {
    fun isEnabled(context: Context): Boolean =
        preferences(context).getBoolean(SMS_ENABLED, false)

    fun hasBeenConfigured(context: Context): Boolean =
        preferences(context).getBoolean(SMS_CONFIGURED, false)

    fun setEnabled(context: Context, enabled: Boolean) {
        preferences(context).edit()
            .putBoolean(SMS_ENABLED, enabled)
            .putBoolean(SMS_CONFIGURED, true)
            .apply()
    }

    fun sendBookingConfirmation(
        context: Context,
        bookingId: String,
        code: String,
        phone: String,
        reservationDate: String,
        reservationTime: String,
        guests: Int,
    ): SmsGatewayResult {
        if (!isEnabled(context)) return SmsGatewayResult.DISABLED
        if (context.checkSelfPermission(Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED) {
            return SmsGatewayResult.PERMISSION_MISSING
        }
        if (!context.packageManager.hasSystemFeature(PackageManager.FEATURE_TELEPHONY)) {
            return SmsGatewayResult.NO_TELEPHONY
        }
        if (wasAlreadySent(context, bookingId)) return SmsGatewayResult.ALREADY_SENT

        val destination = normalizeSmsDestination(phone) ?: return SmsGatewayResult.INVALID_DESTINATION
        val message = bookingConfirmationSms(code, reservationDate, reservationTime, guests)
        return runCatching {
            val subscriptionId = SubscriptionManager.getDefaultSmsSubscriptionId()
            @Suppress("DEPRECATION")
            val manager = if (subscriptionId != SubscriptionManager.INVALID_SUBSCRIPTION_ID) {
                SmsManager.getSmsManagerForSubscriptionId(subscriptionId)
            } else {
                SmsManager.getDefault()
            }
            val parts = manager.divideMessage(message)
            if (parts.size == 1) {
                manager.sendTextMessage(destination, null, message, null, null)
            } else {
                manager.sendMultipartTextMessage(destination, null, parts, null, null)
            }
            rememberSent(context, bookingId)
            SmsGatewayResult.QUEUED
        }.getOrElse {
            SmsGatewayResult.FAILED
        }
    }

    private fun preferences(context: Context) =
        context.getSharedPreferences(SMS_PREFERENCES, Context.MODE_PRIVATE)

    private fun wasAlreadySent(context: Context, bookingId: String): Boolean {
        if (bookingId.isBlank()) return false
        return preferences(context).getStringSet(SENT_BOOKING_IDS, emptySet()).orEmpty().contains(bookingId)
    }

    private fun rememberSent(context: Context, bookingId: String) {
        if (bookingId.isBlank()) return
        val saved = preferences(context).getStringSet(SENT_BOOKING_IDS, emptySet()).orEmpty().toMutableSet()
        if (saved.size >= MAX_SAVED_BOOKING_IDS) saved.remove(saved.first())
        saved += bookingId
        preferences(context).edit().putStringSet(SENT_BOOKING_IDS, saved).apply()
    }
}

internal fun normalizeSmsDestination(rawPhone: String): String? {
    val trimmed = rawPhone.trim()
    val hadInternationalPrefix = trimmed.startsWith("+") || trimmed.startsWith("00")
    var digits = trimmed.filter(Char::isDigit)
    if (digits.startsWith("00")) digits = digits.drop(2)
    if (digits.length !in 8..15) return null
    return when {
        hadInternationalPrefix -> "+$digits"
        digits.length == 10 && digits.startsWith("3") -> "+39$digits"
        else -> digits
    }
}

internal fun bookingConfirmationSms(
    code: String,
    reservationDate: String,
    reservationTime: String,
    guests: Int,
): String {
    val date = runCatching {
        LocalDate.parse(reservationDate).format(DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.ITALY))
    }.getOrDefault(reservationDate)
    val party = if (guests == 1) "1 persona" else "$guests persone"
    return "Paradiso Lounge Bar: prenotazione $code confermata il $date alle $reservationTime per $party. Mostra il QR ricevuto via email."
}
