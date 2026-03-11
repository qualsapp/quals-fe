import { render, screen } from "@/__tests__/test-utils";
import userEvent from "@testing-library/user-event";
import CommunityCard from "@/components/commons/community-card";

const mockOnJoin = jest.fn();

describe("CommunityCard", () => {
  const defaultProps = {
    community: {
      id: "1",
      name: "Test Community",
      description: "A test community for badminton",
      sport_type: "badminton",
      address: "Test Location",
      members_count: 10,
      created_at: "2024-01-01",
      image_url: "https://example.com/image.jpg",
      host_id: "1",
      sport_types: [{ id: "1", name: "Badminton", slug: "badminton" }],
    },
    onJoin: mockOnJoin,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders community information correctly", () => {
    render(<CommunityCard {...defaultProps} />);

    expect(screen.getByText("Test Community")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
    expect(
      screen.getByText("A test community for badminton"),
    ).toBeInTheDocument();
  });

  it("renders community image with correct attributes", () => {
    render(<CommunityCard {...defaultProps} />);

    const image = screen.getByRole("img", { name: /test community/i });
    expect(image).toBeInTheDocument();
    // Next.js Image component processes the src, so we check for the original URL in the processed src
    expect(image.getAttribute("src")).toContain(
      "https%3A%2F%2Fexample.com%2Fimage.jpg",
    );
    expect(image).toHaveAttribute("alt", "Test Community");
  });

  it("calls onJoin when Join Community button is clicked", async () => {
    const user = userEvent.setup();
    render(<CommunityCard {...defaultProps} />);

    const joinButton = screen.getByRole("button", { name: /join community/i });
    await user.click(joinButton);

    expect(mockOnJoin).toHaveBeenCalledTimes(1);
    expect(mockOnJoin).toHaveBeenCalledWith("1");
  });

  it("renders view community link with correct href", () => {
    render(<CommunityCard {...defaultProps} />);

    const detailsLink = screen.getByRole("link");
    expect(detailsLink).toHaveAttribute(
      "href",
      `/communities/${defaultProps.community.id}`,
    );

    // Check the button inside the link
    const detailsButton = screen.getByRole("button", {
      name: /view community/i,
    });
    expect(detailsButton).toBeInTheDocument();
  });

  it("handles long descriptions with truncation", () => {
    const longDescriptionCommunity = {
      ...defaultProps.community,
      description:
        "This is a very long description that should be truncated when displayed on the card because it exceeds the maximum number of lines allowed for the description text.",
    };

    render(
      <CommunityCard {...defaultProps} community={longDescriptionCommunity} />,
    );

    expect(
      screen.getByText(longDescriptionCommunity.description),
    ).toBeInTheDocument();
    // The truncation is handled by CSS classes, so we just verify the text is rendered
  });

  it("renders with different community data", () => {
    const differentCommunity = {
      id: "2",
      name: "Tennis Club",
      description: "A professional tennis community",
      sport_type: "tennis",
      address: "Downtown Court",
      members_count: 25,
      created_at: "2024-02-01",
      image_url: "https://example.com/tennis.jpg",
      host_id: "2",
      sport_types: [{ id: "2", name: "Tennis", slug: "tennis" }],
    };

    render(
      <CommunityCard community={differentCommunity} onJoin={mockOnJoin} />,
    );

    expect(screen.getByText("Tennis Club")).toBeInTheDocument();
    expect(screen.getByText("Downtown Court")).toBeInTheDocument();
    expect(
      screen.getByText("A professional tennis community"),
    ).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /tennis club/i });
    expect(image.getAttribute("src")).toContain(
      "https%3A%2F%2Fexample.com%2Ftennis.jpg",
    );
  });

  it("handles click events correctly", async () => {
    const user = userEvent.setup();
    render(<CommunityCard {...defaultProps} />);

    const joinButton = screen.getByRole("button", { name: /join community/i });

    // Test multiple clicks
    await user.click(joinButton);
    await user.click(joinButton);

    expect(mockOnJoin).toHaveBeenCalledTimes(2);
  });
});
