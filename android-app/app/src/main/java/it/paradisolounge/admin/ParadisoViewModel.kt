package it.paradisolounge.admin

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import java.time.LocalDate
import java.util.concurrent.Executors

class ParadisoViewModel(application: Application) : AndroidViewModel(application) {
    private val api = ApiClient()
    private val storage = SecureStorage(application)
    private val executor = Executors.newSingleThreadExecutor()

    var state by mutableStateOf(AppState())
        private set

    init {
        restoreSession()
    }

    fun login(email: String, password: String) {
        if (email.isBlank() || password.isBlank()) {
            notice("Inserisci email e password.", true)
            return
        }
        state = state.copy(isLoading = true)
        background(
            work = { api.login(email, password) },
            success = { newToken ->
                storage.saveToken(newToken)
                state = state.copy(token = newToken, isLoading = false, isRestoringSession = false)
                refresh()
            },
        )
    }

    fun logout() {
        storage.clear()
        state = AppState(isRestoringSession = false)
    }

    fun refresh() {
        val token = state.token ?: return
        state = state.copy(isLoading = true)
        background(
            work = {
                val bookings = api.bookings(token)
                val period = currentPeriod()
                val accounting = api.accounting(token, period.first, period.second)
                Triple(bookings, accounting.first, accounting.second)
            },
            success = { (bookings, summary, entries) ->
                state = state.copy(
                    isLoading = false,
                    bookings = bookings,
                    summary = summary,
                    entries = entries,
                )
            },
        )
    }

    fun setSection(section: Section) {
        state = state.copy(selectedSection = section)
    }

    fun setStatusFilter(status: String) {
        state = state.copy(statusFilter = status)
    }

    fun openBookingFromQr(rawValue: String) {
        val code = extractBookingCode(rawValue)
        if (code == null) {
            notice("QR non valido: il codice prenotazione non è stato riconosciuto.", true)
            return
        }
        val token = state.token ?: return
        state = state.copy(isLoading = true)
        background(
            work = { api.bookingByCode(token, code) },
            success = { booking ->
                val updatedBookings = state.bookings
                    .filterNot { it.id == booking.id }
                    .toMutableList()
                    .apply { add(0, booking) }
                state = state.copy(
                    isLoading = false,
                    bookings = updatedBookings,
                    selectedSection = Section.BOOKINGS,
                    statusFilter = "Tutti",
                    scannedBooking = booking,
                )
                notice("${booking.code}: prenotazione trovata.")
            },
        )
    }

    fun consumeScannedBooking() {
        state = state.copy(scannedBooking = null)
    }

    fun scannerUnavailable() {
        notice("Lettore QR non disponibile. Controlla Google Play Services e riprova.", true)
    }

    fun updateStatus(booking: Booking, status: String) {
        val token = state.token ?: return
        state = state.copy(isLoading = true)
        background(
            work = { api.updateBookingStatus(token, booking.id, status) },
            success = {
                state = state.copy(
                    isLoading = false,
                    bookings = state.bookings.map {
                        if (it.id == booking.id) it.copy(status = status) else it
                    },
                )
                notice("${booking.code}: stato aggiornato.")
            },
        )
    }

    fun addLedgerEntry(
        kind: String,
        amount: Double,
        date: String,
        category: String,
        description: String,
        paymentMethod: String,
        onDone: () -> Unit,
    ) {
        val token = state.token ?: return
        if (amount <= 0 || category.trim().length < 2 || runCatching { LocalDate.parse(date) }.isFailure) {
            notice("Controlla importo, data e categoria.", true)
            return
        }
        state = state.copy(isLoading = true)
        background(
            work = {
                api.createLedgerEntry(token, date, kind, category, description, paymentMethod, amount)
            },
            success = {
                onDone()
                notice("Movimento registrato.")
                refresh()
            },
        )
    }

    fun registerIncome(
        booking: Booking,
        amount: Double,
        date: String,
        paymentMethod: String,
        onDone: () -> Unit,
    ) {
        val token = state.token ?: return
        if (amount <= 0 || runCatching { LocalDate.parse(date) }.isFailure) {
            notice("Controlla importo e data.", true)
            return
        }
        state = state.copy(isLoading = true)
        background(
            work = { api.registerBookingIncome(token, booking.id, amount, date, paymentMethod) },
            success = {
                onDone()
                notice("Incasso ${booking.code} registrato.")
                refresh()
            },
        )
    }

    fun registerDevice(messagingToken: String, deviceName: String) {
        val token = state.token ?: return
        background(
            work = { api.registerDevice(token, messagingToken, deviceName) },
            success = {},
            showLoading = false,
            reportError = false,
        )
    }

    fun clearNotice() {
        state = state.copy(notice = null, noticeIsError = false)
    }

    override fun onCleared() {
        executor.shutdownNow()
        super.onCleared()
    }

    private fun restoreSession() {
        val saved = storage.readToken()
        if (saved == null) {
            state = state.copy(isRestoringSession = false)
            return
        }
        background(
            work = {
                api.me(saved)
                saved
            },
            success = {
                state = state.copy(token = saved, isRestoringSession = false)
                refresh()
            },
            showLoading = false,
            failure = {
                storage.clear()
                state = AppState(isRestoringSession = false)
            },
        )
    }

    private fun <T> background(
        work: () -> T,
        success: (T) -> Unit,
        showLoading: Boolean = true,
        reportError: Boolean = true,
        failure: ((Throwable) -> Unit)? = null,
    ) {
        executor.execute {
            runCatching(work).fold(
                onSuccess = { result ->
                    getApplication<Application>().mainExecutor.execute { success(result) }
                },
                onFailure = { error ->
                    getApplication<Application>().mainExecutor.execute {
                        if (showLoading) state = state.copy(isLoading = false)
                        if (failure != null) {
                            failure(error)
                        } else if (error is ApiException && error.status == 401) {
                            logout()
                            notice("Sessione scaduta. Accedi di nuovo.", true)
                        } else if (reportError) {
                            notice(error.message ?: "Connessione non disponibile.", true)
                        }
                    }
                },
            )
        }
    }

    private fun notice(message: String, error: Boolean = false) {
        state = state.copy(notice = message, noticeIsError = error, isLoading = false)
    }

    private fun currentPeriod(): Pair<String, String> {
        val today = LocalDate.now()
        return today.withDayOfMonth(1).toString() to today.toString()
    }
}
