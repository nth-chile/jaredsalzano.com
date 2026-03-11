"use client"

import { useState, useEffect } from "react"
import "@/styles/cookie-popup.css"

const DISMISS_DELAY = 2000

export default function CookiePopup() {
  const [state, setState] = useState<"choosing" | "accepted" | "exiting">("choosing")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie-popup-dismissed")
    if (!dismissed || Date.now() - Number(dismissed) > 30 * 60 * 1000) {
      setVisible(true)
    }
  }, [])

  function handleChoice(option: string) {
    localStorage.setItem("cookie-popup-dismissed", String(Date.now()))
    setState("accepted")
  }

  function handleDismiss() {
    localStorage.setItem("cookie-popup-dismissed", String(Date.now()))
    setState("exiting")
  }

  useEffect(() => {
    if (state === "accepted") {
      const timer = setTimeout(() => setState("exiting"), DISMISS_DELAY)
      return () => clearTimeout(timer)
    }
    if (state === "exiting") {
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [state])

  if (!visible) return null

  return (
    <div className={`cookie-popup ${state === "exiting" ? "cookie-popup-exit" : ""}`}>
      <button
        className="cookie-popup-close"
        onClick={handleDismiss}
        aria-label="Close"
      >
        &times;
      </button>
      {state === "choosing" ? (
        <>
          <p className="cookie-popup-text">
            Do you prefer cookies or pizza?
          </p>
          <div className="cookie-popup-buttons">
            <button
              className="cookie-popup-btn cookie-popup-btn-primary"
              onClick={() => handleChoice("pizza")}
            >
              Pizza
            </button>
            <button
              className="cookie-popup-btn cookie-popup-btn-secondary"
              onClick={() => handleChoice("cookies")}
            >
              Cookies
            </button>
          </div>
        </>
      ) : (
        <p className="cookie-popup-text cookie-popup-thanks">Ok, thanks.</p>
      )}
      {state === "accepted" && <div className="cookie-popup-progress"><div className="cookie-popup-progress-bar" /></div>}
    </div>
  )
}
