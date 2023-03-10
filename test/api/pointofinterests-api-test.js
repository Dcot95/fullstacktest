import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { playtimeService } from "./playtime-service.js";
import { maggie, mozart, testCountrys, testPointofinterests, concerto } from "../fixtures.js";

suite("Pointofinterest API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    await playtimeService.deleteAllCountrys();
    await playtimeService.deleteAllUsers();
    await playtimeService.deleteAllPointofinterests();
    user = await playtimeService.createUser(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await playtimeService.createCountry(mozart);
  });

  teardown(async () => {});

  test("create pointofinterest", async () => {
    const returnedPointofinterest = await playtimeService.createPointofinterest(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedPointofinterest);
  });

  test("create Multiple pointofinterests", async () => {
    for (let i = 0; i < testPointofinterests.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPointofinterest(beethovenSonatas._id, testPointofinterests[i]);
    }
    const returnedPointofinterests = await playtimeService.getAllPointofinterests();
    assert.equal(returnedPointofinterests.length, testPointofinterests.length);
    for (let i = 0; i < returnedPointofinterests.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const pointofinterest = await playtimeService.getPointofinterest(returnedPointofinterests[i]._id);
      assertSubset(pointofinterest, returnedPointofinterests[i]);
    }
  });

  test("Delete PointofinterestApi", async () => {
    for (let i = 0; i < testPointofinterests.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPointofinterest(beethovenSonatas._id, testPointofinterests[i]);
    }
    let returnedPointofinterests = await playtimeService.getAllPointofinterests();
    assert.equal(returnedPointofinterests.length, testPointofinterests.length);
    for (let i = 0; i < returnedPointofinterests.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const pointofinterest = await playtimeService.deletePointofinterest(returnedPointofinterests[i]._id);
    }
    returnedPointofinterests = await playtimeService.getAllPointofinterests();
    assert.equal(returnedPointofinterests.length, 0);
  });

  test("denormalised country", async () => {
    for (let i = 0; i < testPointofinterests.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPointofinterest(beethovenSonatas._id, testPointofinterests[i]);
    }
    const returnedCountry = await playtimeService.getCountry(beethovenSonatas._id);
    assert.equal(returnedCountry.pointofinterests.length, testPointofinterests.length);
    for (let i = 0; i < testPointofinterests.length; i += 1) {
      assertSubset(testPointofinterests[i], returnedCountry.pointofinterests[i]);
    }
  });
});
