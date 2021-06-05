const dev = process.env.NODE_ENV !== 'production'
const baseUrl = dev ? 'http://localhost:3002/' : 'https://certified-repair.vercel.app'
export default baseUrl