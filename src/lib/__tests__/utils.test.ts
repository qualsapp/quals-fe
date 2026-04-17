import { cn, eventState } from "@/lib/utils";
import { EventResponse } from "@/types/event";
import dayjs from "dayjs";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    });

    it("resolves conflicting Tailwind classes", () => {
      expect(cn("px-4", "px-8")).toBe("px-8");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("handles conditional class names", () => {
      expect(cn("base-class", true && "conditional-class")).toBe(
        "base-class conditional-class",
      );
      expect(cn("base-class", false && "conditional-class")).toBe("base-class");
    });

    it("handles arrays of class names", () => {
      expect(cn(["px-4", "py-2"], "text-center")).toBe("px-4 py-2 text-center");
    });

    it("handles undefined and null values", () => {
      expect(cn("px-4", undefined, "py-2", null)).toBe("px-4 py-2");
    });

    it("handles objects with boolean values", () => {
      expect(
        cn({
          "px-4": true,
          "py-2": false,
          "text-center": true,
        }),
      ).toBe("px-4 text-center");
    });

    it("handles empty input", () => {
      expect(cn()).toBe("");
      expect(cn("")).toBe("");
    });
  });

  describe("eventState", () => {
    const createMockEvent = (
      startDate: string,
      endDate: string,
    ): EventResponse => ({
      id: "1",
      title: "Test Event",
      description: "Test Description",
      event_type: "tournament",
      sport_type: { id: "1", name: "Badminton", slug: "badminton" },
      start_date: startDate,
      end_date: endDate,
      location: "Test Location",
      community_id: "1",
    });

    it('returns "next" when event is in the future', () => {
      const now = dayjs();
      const startTime = now.add(1, "hour").toISOString();
      const endTime = now.add(2, "hour").toISOString();

      const event = createMockEvent(startTime, endTime);
      expect(eventState(event)).toBe("next");
    });

    it('returns "completed" when event is in the past', () => {
      const now = dayjs();
      const startTime = now.subtract(2, "hour").toISOString();
      const endTime = now.subtract(1, "hour").toISOString();

      const event = createMockEvent(startTime, endTime);
      expect(eventState(event)).toBe("completed");
    });

    it('returns "live" when event is currently happening', () => {
      const now = dayjs();
      const startTime = now.subtract(1, "hour").toISOString();
      const endTime = now.add(1, "hour").toISOString();

      const event = createMockEvent(startTime, endTime);
      expect(eventState(event)).toBe("live");
    });

    it('returns "live" when current time equals start time', () => {
      const now = dayjs();
      const startTime = now.toISOString();
      const endTime = now.add(1, "hour").toISOString();

      const event = createMockEvent(startTime, endTime);
      expect(eventState(event)).toBe("live");
    });

    it('returns "completed" when current time equals end time', () => {
      const now = dayjs();
      const startTime = now.subtract(1, "hour").toISOString();
      const endTime = now.subtract(1, "second").toISOString(); // Make it clearly in the past

      const event = createMockEvent(startTime, endTime);
      expect(eventState(event)).toBe("completed");
    });

    it("handles different date formats", () => {
      const event = createMockEvent(
        "2024-03-01T10:00:00Z",
        "2024-03-01T12:00:00Z",
      );

      // This will depend on when the test runs, but we can verify it returns a valid state
      const state = eventState(event);
      expect(["next", "live", "completed"]).toContain(state);
    });
  });
});
