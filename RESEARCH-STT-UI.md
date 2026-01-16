# Speech-to-Text App UI Research

## Floating Widget Patterns (Bottom-Center)

### Common UI Patterns

**1. Floating Pill/Bar Design (Most Popular)**
- Semi-transparent oval or "pill" shape that hovers above content
- Anchored at bottom-center of screen
- Contracts to compact state when idle (just microphone icon)
- Expands when activated to show controls and transcription status
- Google's Gemini uses this pattern extensively

**2. Minimal Floating Toolbar**
- Windows 11 dictation: Small toolbar with microphone icon, triggered by `Win + H`
- Shows "Listening" status indicator
- Settings gear icon for quick access to options
- Can be dragged/repositioned but defaults to bottom-center

---

## Key UI Elements in Leading Apps

### Wispr Flow (wisprflow.ai)
- Always-on background service, activated via hotkey (fn key twice)
- Minimal overlay that appears when dictating
- Real-time transcript display
- Automatic tone adjustment based on active app
- Cross-platform sync (Mac, Windows, iOS)

### Superwhisper (superwhisper.com)
- Menu bar icon (macOS) - click or hotkey to activate
- Floating transcription window appears during dictation
- Works in any text field via clipboard integration
- Offline-first, no visible widget until activated

### Gboard Voice Typing (Android)
- Integrated into keyboard, replacing old floating microphone button
- Waveform animation shows audio input levels
- Inline in keyboard area rather than floating overlay

---

## Widget Design Best Practices

| Element | Implementation |
|---------|----------------|
| **Shape** | Pill/rounded rectangle, 48-56px height |
| **Position** | Bottom-center, 16-24px margin from edge |
| **States** | Idle (mic icon only), Listening (waveform), Processing (spinner) |
| **Feedback** | Pulsing animation or waveform bars during speech |
| **Colors** | Semi-transparent background, accent color for active state |
| **Dismiss** | Tap outside, swipe down, or timeout |

---

## Visual Feedback Patterns

1. **Waveform visualization** - Vertical bars that react to voice amplitude in real-time
2. **Pulsing microphone** - Subtle scale/opacity animation while listening
3. **Live transcript** - Text appears above/below the widget as you speak
4. **Status text** - "Listening...", "Processing...", "Tap to speak"

---

## Typical Widget Structure

### Expanded State
```
┌─────────────────────────────────────┐
│  [🎤]  "Listening..."   [⚙️] [✕]   │
│  ════════════════════              │  ← waveform
└─────────────────────────────────────┘
```

### Collapsed State
```
    ┌──────┐
    │  🎤  │
    └──────┘
```

---

## References

- [Google's Floating Gemini Bar](https://windowsnews.ai/article/googles-floating-gemini-bar-a-new-ui-paradigm-that-could-influence-windows.395381)
- [Wispr Flow](https://wisprflow.ai/)
- [Superwhisper](https://superwhisper.com/)
- [Windows 11 Voice Typing](https://windows-files.com/dictation-toolbar-in-windows-11/)
- [Gboard Voice Typing UI](https://www.androidpolice.com/gboards-new-voice-typing-ui/)
- [Speech Waves Animation (Android)](https://medium.com/@niksheva/speech-waves-an-android-canvas-animation-study-e2d93011481a)
