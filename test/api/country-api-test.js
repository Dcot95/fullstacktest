import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, mozart, testCountrys } from "../fixtures.js";

suite("Country API tests", () => {
  let user = null;

  setup(async () => {
    await playtimeService.deleteAllCountrys();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create country", async () => {
    const returnedCountry = await playtimeService.createCountry(mozart);
    assert.isNotNull(returnedCountry);
    assertSubset(mozart, returnedCountry);
  });

  test("delete a country", async () => {
    const country = await playtimeService.createCountry(mozart);
    const response = await playtimeService.deleteCountry(country._id);
    assert.equal(response.status, 204);
    try {
      const returnedCountry = await playtimeService.getCountry(country.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
    }
  });

  test("create multiple countrys", async () => {
    for (let i = 0; i < testCountrys.length; i += 1) {
      testCountrys[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createCountry(testCountrys[i]);
    }
    let returnedLists = await playtimeService.getAllCountrys();
    assert.equal(returnedLists.length, testCountrys.length);
    await playtimeService.deleteAllCountrys();
    returnedLists = await playtimeService.getAllCountrys();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant country", async () => {
    try {
      const response = await playtimeService.deleteCountry("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
    }
  });
});
