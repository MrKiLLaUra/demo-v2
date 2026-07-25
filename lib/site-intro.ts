// Fired by SiteLoadingScreen once its exit fade is ~80% through, so the
// hero video (or anything else waiting on the intro) can start revealing
// itself while the splash is still dissolving, instead of after it's gone.
export const SITE_INTRO_REVEAL_EVENT = "site-intro-reveal"
