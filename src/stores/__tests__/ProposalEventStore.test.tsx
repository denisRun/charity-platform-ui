//mocked modules
jest.mock("../../axios/Axios")

import { IProposalEventService } from "../../services/ProposalEventService";
import { IUserService } from "../../services/UserService";
import { MockProposalServiceInstance } from "../../services/__mock__/ProposalEventService";
import { IProposalSearchRequest } from "../../types/ProposalEvent/ProposaSearchRequest";
import { IProposalEventUpdateResource } from "../../types/ProposalEvent/ProposalEventUpdateResource";
import { ProposalRequestCreateRequest } from "../../types/ProposalEvent/ProposalRequestCreateRequest";
import { ProposalRequestStatusUpdateResource } from "../../types/ProposalEvent/ProposalRequestStatusUpdateResource";
import { ProposalEventStore } from "../ProposalEventStore";
import {UserStore} from "../UserStore";

describe("UserStore tests", () => {
  it("created Proposal Event id should be returned", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    let eventId = await store.createEvent(new IProposalEventUpdateResource());

    expect(eventId).not.toBeUndefined();
    expect(eventId).not.toBeNull();

    expect(eventId).toBe(5)
  });

  it("getting Proposal Event by Id should set event in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.getById("1");

    expect(store.event).not.toBeUndefined();
    expect(store.event).not.toBeNull();

    expect(store.event?.id).toBe(1)
    expect(store.event?.title).toBe("title")
    expect(store.event?.description).toBe("description")
    expect(store.event?.imageURL).toBe("imageURL")
  });

  it("update Proposal Event should set event in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.updateEvent(new IProposalEventUpdateResource());

    expect(store.event).not.toBeUndefined();
    expect(store.event).not.toBeNull();

    expect(store.event?.id).toBe(1)
    expect(store.event?.title).toBe("title")
    expect(store.event?.description).toBe("description")
    expect(store.event?.imageURL).toBe("imageURL")
  });

  it("searching Proposal Events taking part should set them in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    let request: IProposalSearchRequest = new IProposalSearchRequest();
    request.takingPart = true;
    await store.searchEvents(request);

    expect(store.tookPartEvents).not.toBeUndefined();
    expect(store.tookPartEvents).not.toBeNull();
    expect(store.tookPartEventsTotalPageCount).not.toBeUndefined();
    expect(store.tookPartEventsTotalPageCount).not.toBeNull();

    expect(store.tookPartEvents.length).toBe(1)
    expect(store.tookPartEventsTotalPageCount).toBe(2);
  });

  it("searching Proposal Events NOT taking part should set them in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    let request: IProposalSearchRequest = new IProposalSearchRequest();
    request.takingPart = false;
    await store.searchEvents(request);

    expect(store.events).not.toBeUndefined();
    expect(store.events).not.toBeNull();
    expect(store.eventsTotalPageCount).not.toBeUndefined();
    expect(store.eventsTotalPageCount).not.toBeNull();

    expect(store.events.length).toBe(1)
    expect(store.eventsTotalPageCount).toBe(2);
  });

  it("searching OWN Proposal Events should set them in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.getOwnEvents();

    expect(store.ownEvents).not.toBeUndefined();
    expect(store.ownEvents).not.toBeNull();

    expect(store.ownEvents.length).toBe(1)
  });

  it("adding new comment should set event in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.addComment("text");

    expect(store.event).not.toBeUndefined();
    expect(store.event).not.toBeNull();

    expect(store.event?.id).toBe(1)
    expect(store.event?.title).toBe("title")
    expect(store.event?.description).toBe("description")
    expect(store.event?.imageURL).toBe("imageURL")
  });

  it("adding new request should set event in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.addEventRequest(new ProposalRequestCreateRequest());

    expect(store.event).not.toBeUndefined();
    expect(store.event).not.toBeNull();

    expect(store.event?.id).toBe(1)
    expect(store.event?.title).toBe("title")
    expect(store.event?.description).toBe("description")
    expect(store.event?.imageURL).toBe("imageURL")
  });

  it("accepting request should set event in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.acceptRequest(1, true);

    expect(store.event).not.toBeUndefined();
    expect(store.event).not.toBeNull();

    expect(store.event?.id).toBe(1)
    expect(store.event?.title).toBe("title")
    expect(store.event?.description).toBe("description")
    expect(store.event?.imageURL).toBe("imageURL")
  });

  it("updating request status should set event in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.updateRequestStatus(1, new ProposalRequestStatusUpdateResource());

    expect(store.event).not.toBeUndefined();
    expect(store.event).not.toBeNull();

    expect(store.event?.id).toBe(1)
    expect(store.event?.title).toBe("title")
    expect(store.event?.description).toBe("description")
    expect(store.event?.imageURL).toBe("imageURL")
  });

  it("getting statistics should set user statistics in state", async () => {
    const eventService: IProposalEventService = MockProposalServiceInstance;
    const store = new ProposalEventStore(eventService);
    await store.getStatistics();

    expect(store.statistics).not.toBeUndefined();
    expect(store.statistics).not.toBeNull();

    expect(store.statistics.transactionsCount).toBe(2);
    expect(store.statistics.transactionsCountCompare).toBe(100);
  });

});

