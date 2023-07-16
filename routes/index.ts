export default eventHandler(() => {
  return { 'laravel-auditing': 'Is Awesome!', datetime: new Date(), envs: process.env }
})
