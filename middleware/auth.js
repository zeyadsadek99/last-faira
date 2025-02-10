export default function auth({ next, router }) {
    if (!localStorage.getItem("elmo3lm_elmosa3d_user_token")) {
        return router.push("/login");
    }
    return next();
}
