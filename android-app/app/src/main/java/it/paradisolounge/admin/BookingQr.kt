package it.paradisolounge.admin

import java.net.URLDecoder
import java.nio.charset.StandardCharsets
import java.util.Locale

private val bookingCodePattern = Regex(
    pattern = """(?i)(?<![A-Z0-9])P-[A-F0-9]{8}(?![A-Z0-9])""",
)

internal fun extractBookingCode(rawValue: String): String? {
    val trimmed = rawValue.trim()
    if (trimmed.isEmpty()) return null

    val decoded = runCatching {
        URLDecoder.decode(trimmed, StandardCharsets.UTF_8.name())
    }.getOrDefault(trimmed)

    return sequenceOf(trimmed, decoded)
        .mapNotNull { bookingCodePattern.find(it)?.value }
        .firstOrNull()
        ?.uppercase(Locale.ROOT)
}
