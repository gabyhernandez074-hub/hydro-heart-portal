<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Sensor charts
- Keep chart presentation in a reusable browser-safe component using Recharts; this keeps axes, smoothing, and tooltips reliable without custom plotting math.
- Keep sensor subscriptions in the existing data adapter and explicitly label simulated readings until a real data source is configured; this prevents demo data being mistaken for live measurements.
