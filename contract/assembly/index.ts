/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import {
  Context,
  logging,
  PersistentMap,
  PersistentUnorderedMap,
  math,
  u128,
  ContractPromiseBatch,
} from "near-sdk-as";

@nearBindgen
class Fundraiser {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  amountRaised: u32;
}

@nearBindgen
class Donation {
  id: string;
  donatorId: string;
  fundraiserId: string;
  amount: u32;
}

// naother mapping from assignee id to set of all assignments

// map from userId to fundraiserId
const userFundraisers = new PersistentUnorderedMap<string, string[]>(
  "userFundraisers"
);

// map from userId to donationId
const userDonations = new PersistentUnorderedMap<string, string[]>(
  "userDonations"
);

// map from fundraiserId to Fundraiser class
const fundraisers: PersistentUnorderedMap<string, Fundraiser> =
  new PersistentUnorderedMap<string, Fundraiser>("fundraisers");

// map from donationId to Donation class
const donations: PersistentUnorderedMap<string, Donation> =
  new PersistentUnorderedMap<string, Donation>("donations");

export function getAllOtherFundraisers(): Fundraiser[] {
  const iterator = fundraisers.values();
  return iterator;
}

export function getAllMyFundraisers(): Fundraiser[] {
  if (userFundraisers.contains(Context.sender)) {
    let fundraiserIds: string[] = userFundraisers.getSome(Context.sender);
    let fundraiserObjects: Fundraiser[] = [];
    for (let i = 0; i < fundraiserIds.length; i++) {
      let fundraiserId: string = fundraiserIds[i];
      if (fundraisers.contains(fundraiserId)) {
        let fundraiserObj: Fundraiser = fundraisers.getSome(fundraiserId);
        fundraiserObjects.push(fundraiserObj);
      }
    }
    return fundraiserObjects;
  }
  return [];
}

// export function getAllMyDonations(): {};

export function createFundraiser(title: string, description: string): string {
  if (!title || !description) {
    throw new Error("missing information");
  }
  const id = math.hash32<string>(Context.sender + title).toString();
  fundraisers.set(id, {
    id,
    creatorId: Context.sender,
    title,
    description,
    amountRaised: 0,
  });
  let existingFundraisers: string[] = [];
  if (userFundraisers.contains(Context.sender)) {
    existingFundraisers = userFundraisers.getSome(Context.sender);
  }
  existingFundraisers.push(id);
  userFundraisers.set(Context.sender, existingFundraisers);
  return id;
}

export function donateToFundraiser(
  creator: string,
  title: string,
  amount: u32
): string {
  const id = math
    .hash32<string>(Context.sender + title + amount.toString())
    .toString();

  donations.set(id, {
    id,
    donatorId: Context.sender,
    fundraiserId: math.hash32<string>(creator + title).toString(),
    amount,
  });

  return id;
}

export function clearBlockchain(): void {
  fundraisers.clear();
  donations.clear();
  userFundraisers.clear();
  userDonations.clear();
}

export function transferNearTokens(
  fundraiserId: string,
  parsedAmount: u128,
  nearAmount: u32
): void {
  let fundraiser: Fundraiser = fundraisers.getSome(fundraiserId);
  let account: string = fundraiser.creatorId;
  let amountRaised: u32 = fundraiser.amountRaised + nearAmount;

  fundraiser.amountRaised = amountRaised;
  fundraisers.set(fundraiserId, fundraiser);
  ContractPromiseBatch.create(account).transfer(parsedAmount);
  logging.log("Success! Tokens Transferred to " + account);
}
