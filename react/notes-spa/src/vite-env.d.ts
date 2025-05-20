/// <reference types="vite/client" />
export default defineConfig({
  base: "/", // important if you're not deploying under a subpath
  plugins: [react()],
});
