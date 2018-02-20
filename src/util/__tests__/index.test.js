import { generateObjectId } from ".."

it("generates object id correctly", () => {
  const objId = generateObjectId()
  expect(objId).toHaveLength(24)
})
