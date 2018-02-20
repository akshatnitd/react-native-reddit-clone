/** generate mongo-like object id
 *  taken from https://gist.github.com/solenoid/1372386
 */
export const generateObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, () => {
        return ((Math.random() * 16) | 0).toString(16)
      })
      .toLowerCase()
  )
}
