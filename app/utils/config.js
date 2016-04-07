module.exports = {

    maxImageRefreshTime: 1000, // refresh is throttled with this parameter (safe == 1000)

    // Video refresh rates (used for setInterval)
    refreshRates: {
        live: 300, // Safe == 1000
        preview: 5000,
        screenshot: 10000
    },

    // Just the window list
    updateWindowListTime: 1000,  // ms

    // Mouse
    mouseRefreshTime: 100 // ms
}
