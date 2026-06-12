# Applying the “Filter by” changes to `quals-fe`

This folder mirrors your repo structure. Each file below is a **drop‑in replacement**
(or **new file**) — copy it to the same path under `quals-fe/`.

Visual reference: `Matches Filter Mockups.dc.html` (open in the preview).

---

## What ships

| Action | File |
|---|---|
| **NEW** | `src/components/event/tab-filter-bar.tsx` |
| Replace | `src/components/event/layout-actions.tsx` |
| Replace | `src/app/(host)/community/events/[id]/tournaments/[tid]/(main)/layout.tsx` |
| Replace | `src/app/(host)/community/events/[id]/tournaments/[tid]/(main)/matches/page.tsx` |
| Replace | `src/app/(player)/events/[id]/tournaments/[tid]/(main)/layout.tsx` |
| Replace | `src/app/(player)/events/[id]/tournaments/[tid]/(main)/matches/page.tsx` |
| **Delete** (optional) | `src/components/event/tournament-switcher.tsx` |

After copying, `tournament-switcher.tsx` is no longer imported anywhere — safe to delete.

---

## The changes, in plain terms

1. **New `TabFilterBar`** replaces the top tournament pills **and** the
   `Live / Order of Play` toggle. It renders:
   - a **Filter by tournament** dropdown on every tab (Matches, Group, Playoff,
     Participants). Picking a tournament navigates to that tournament’s route,
     keeping you on the current sub‑tab.
   - a **status segmented control** (All · Live · Scheduled · Completed) that only
     shows on the **Matches** tab. It writes `?status=` to the URL.

2. **`layout.tsx`** (host + player): removed `<TournamentSwitcher>`; render
   `<TabFilterBar>` in a `container` just below the sub‑tab nav. Host layout also
   passes `addHref` to `LayoutActions`.

3. **`layout-actions.tsx`**: adds a primary **`+ Add tournament`** button, then a
   bordered cluster of **Edit · Rules · Delete** — so rules editing is kept
   (this is “Option B” from the mock).

4. **`matches/page.tsx`** (host + player): dropped the `<Tabs>` / Live /
   Order‑of‑Play markup. The page now always renders the round → court grid and
   reads `status` from the URL (passed straight to `getMatches`).

---

## ⚠️ One thing to confirm — status enum values

`TabFilterBar` sends these to the API as `?status=`:

```
Live      -> "ongoing"     (confirmed in your code)
Scheduled -> "scheduled"   (assumed)
Completed -> "completed"   (assumed)
```

Only `ongoing` is confirmed in the existing codebase. Check your backend’s match
status enum and adjust the `STATUSES` array at the top of
`tab-filter-bar.tsx` if the real values differ (e.g. `pending` / `finished`).

---

## Optional polish — status badge on each card

The mock shows a small Live / Scheduled / Completed pill on every match card.
To add it, drop this into `src/components/commons/match-card.tsx` inside the
`<CardHeader>`, after the `<CardTitle>` block:

```tsx
{match.status && (
  <span
    className={cn(
      "mx-auto mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
      match.status === "ongoing" && "bg-green-100 text-green-700",
      match.status === "completed" && "bg-slate-100 text-slate-600",
      match.status === "scheduled" && "bg-amber-100 text-amber-700",
    )}
  >
    {match.status === "ongoing" && (
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
    )}
    {match.status === "ongoing"
      ? "Live"
      : match.status === "completed"
        ? "Completed"
        : "Scheduled"}
  </span>
)}
```

(`cn` is already imported in that file.)

---

## Quick QA checklist

- [ ] Matches tab: tournament dropdown + status segmented both visible.
- [ ] Group / Playoff / Participants: only the tournament dropdown.
- [ ] Switching tournament keeps you on the same sub‑tab.
- [ ] `?status=ongoing` etc. round‑trips on refresh.
- [ ] Header shows `+ Add tournament` + Edit · Rules · Delete (host only).
- [ ] Empty filter result shows “No matches found for this filter.”
