import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // remove if you want instant
    });
  }, [pathname]);

  return null;
}
// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function ScrollToTop() {
//   const { pathname, state } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ✅ Always scroll to top on refresh (reload)
//     const navEntries = performance.getEntriesByType("navigation");
//     const isReload = navEntries.length && navEntries[0].type === "reload";

//     if (isReload) {
//       window.scrollTo({ top: 0, left: 0, behavior: "auto" });

//       // ✅ clear state so refresh never scrolls to sponsors
//       if (state?.scrollTo) {
//         navigate(pathname, { replace: true, state: {} });
//       }
//       return;
//     }

//     // ✅ Only when coming with state
//     if (state?.scrollTo === "sponsors") {
//       setTimeout(() => {
//         const el = document.getElementById("sponsors");
//         if (el) el.scrollIntoView({ behavior: "smooth" });

//         // ✅ clear state after use
//         navigate(pathname, { replace: true, state: {} });
//       }, 200);
//     } else {
//       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//     }
//   }, [pathname]); // ✅ only pathname

//   return null;
// }
