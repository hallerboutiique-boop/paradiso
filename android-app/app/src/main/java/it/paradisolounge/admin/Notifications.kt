package it.paradisolounge.admin

import android.Manifest
import android.app.Application
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import java.util.concurrent.TimeUnit

class ParadisoApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(
            NotificationChannel(
                "bookings",
                "Nuove prenotazioni",
                NotificationManager.IMPORTANCE_HIGH,
            ).apply {
                description = "Avvisi immediati per le nuove prenotazioni del Paradiso"
                enableVibration(true)
            },
        )
        val syncRequest = PeriodicWorkRequestBuilder<BookingSyncWorker>(15, TimeUnit.MINUTES)
            .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())
            .build()
        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
            "paradiso-booking-sync",
            ExistingPeriodicWorkPolicy.UPDATE,
            syncRequest,
        )
    }
}

class ParadisoMessagingService : FirebaseMessagingService() {
    override fun onNewToken(token: String) {
        val sessionToken = SecureStorage(applicationContext).readToken() ?: return
        Thread {
            runCatching {
                ApiClient().registerDevice(
                    sessionToken,
                    token,
                    "${Build.MANUFACTURER} ${Build.MODEL}",
                )
            }
        }.start()
    }

    override fun onMessageReceived(message: RemoteMessage) {
        val title = message.notification?.title
            ?: message.data["title"]
            ?: "Nuova prenotazione"
        val body = message.notification?.body
            ?: message.data["body"]
            ?: "Apri Paradiso Admin per i dettagli."
        showParadisoNotification(this, title, body)
    }
}

class BookingSyncWorker(
    context: Context,
    parameters: WorkerParameters,
) : Worker(context, parameters) {
    override fun doWork(): Result {
        val token = SecureStorage(applicationContext).readToken() ?: return Result.success()
        return runCatching {
            val bookings = ApiClient().bookings(token)
            val newest = bookings.maxOfOrNull { it.createdAt } ?: return Result.success()
            val preferences = applicationContext.getSharedPreferences("paradiso_sync", Context.MODE_PRIVATE)
            val previous = preferences.getString("latest_booking", null)
            if (previous != null) {
                val additions = bookings.filter { it.createdAt > previous && it.status == "Nuovo" }
                if (additions.isNotEmpty()) {
                    val latest = additions.maxBy { it.createdAt }
                    val body = if (additions.size == 1) {
                        "${latest.reservationDate} alle ${latest.reservationTime} · ${latest.guests} ospiti"
                    } else {
                        "${additions.size} nuove richieste da controllare"
                    }
                    showParadisoNotification(applicationContext, "Nuova prenotazione ${latest.code}", body)
                }
            }
            preferences.edit().putString("latest_booking", newest).apply()
            Result.success()
        }.getOrElse { error ->
            if (error is ApiException && error.status == 401) Result.success() else Result.retry()
        }
    }
}

private fun showParadisoNotification(context: Context, title: String, body: String) {
    if (Build.VERSION.SDK_INT >= 33 &&
        context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
    ) return
    val intent = Intent(context, MainActivity::class.java).apply {
        addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
    }
    val pendingIntent = PendingIntent.getActivity(
        context,
        0,
        intent,
        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
    )
    val notification = Notification.Builder(context, "bookings")
        .setSmallIcon(R.drawable.ic_notification)
        .setColor(context.getColor(R.color.paradiso_gold))
        .setContentTitle(title)
        .setContentText(body)
        .setStyle(Notification.BigTextStyle().bigText(body))
        .setAutoCancel(true)
        .setContentIntent(pendingIntent)
        .build()
    val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    manager.notify(System.currentTimeMillis().toInt(), notification)
}
