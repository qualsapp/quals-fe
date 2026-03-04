import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCommunities } from "@/actions/community";
import { getEvents } from "@/actions/event";
import {
  ArrowRight,
  Trophy,
  Users,
  Calendar,
  MapPin,
  Activity,
} from "lucide-react";
import Image from "next/image";

export default async function HomePage() {
  const [communitiesData, eventsData] = await Promise.all([
    getCommunities(),
    getEvents({ page: 1, page_size: 4 }),
  ]);

  const communities = communitiesData?.communities || [];
  const events = eventsData?.events || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-background pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)_0%,transparent_35%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--color-primary)_0%,transparent_40%)] opacity-10" />
          <div className="bg-grid-white/5 absolute inset-0 bg-[length:32px_32px]" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
              <Activity className="mr-2 h-4 w-4" />
              <span>The #1 Sports Platform</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Elevate Your <span className="text-primary">Game.</span>
              <br className="hidden sm:inline" /> Build Your Community.
            </h1>

            <p className="max-w-2xl text-xl text-muted-foreground md:text-2xl leading-relaxed">
              Find local tournaments, join vibrant sports communities, and
              compete like a pro. Your next match is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/communities">
                  Find Communities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full font-semibold border-2 hover:bg-muted"
                asChild
              >
                <Link href="/community">Host a Tournament</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-3xl shadow-sm border border-border/50 hover:border-primary/50 transition-colors">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-2">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Vibrant Communities</h3>
              <p className="text-muted-foreground">
                Join local leagues, clubs, and groups tailored to your favorite
                sports and skill levels.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-3xl shadow-sm border border-border/50 hover:border-primary/50 transition-colors">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-2">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Competitive Tournaments</h3>
              <p className="text-muted-foreground">
                Track scores, view brackets, and climb the leaderboards in
                officially hosted events.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 bg-card rounded-3xl shadow-sm border border-border/50 hover:border-primary/50 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-2">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Manage Schedules</h3>
              <p className="text-muted-foreground">
                Stay up-to-date with matches, lineup announcements, and
                real-time score updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITIES SECTION */}
      {communities.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-3">
                  Top Communities
                </h2>
                <p className="text-muted-foreground text-lg">
                  Discover active groups nearby
                </p>
              </div>
              <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link href="/communities">
                  View All Communities <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {communities.slice(0, 4).map((community) => (
                <div
                  key={community.id}
                  className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-muted">
                    {community.image_url ? (
                      <Image
                        src={community.image_url}
                        alt={community.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                        <Users className="h-10 w-10 text-primary/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-xl font-bold mb-1 line-clamp-1">
                      {community.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1 shrink-0" />
                      <span className="line-clamp-1">
                        {community.address || "Location unavailable"}
                      </span>
                    </div>
                    <div className="mt-auto pt-4 flex gap-2 overflow-hidden flex-wrap">
                      {community.sport_types?.slice(0, 2).map((sport) => (
                        <span
                          key={sport.id || sport.name}
                          className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold"
                        >
                          {sport.name}
                        </span>
                      ))}
                      {community.sport_types &&
                        community.sport_types.length > 2 && (
                          <span className="px-2.5 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                            +{community.sport_types.length - 2}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10 sm:hidden">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/communities">View All Communities</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS SECTION */}
      {events.length > 0 && (
        <section className="py-24 bg-muted/20 border-t border-border/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-3">
                  Upcoming Events
                </h2>
                <p className="text-muted-foreground text-lg">
                  Don&apos;t miss out on the action
                </p>
              </div>
              <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link href="/events">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {events.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="group flex flex-col bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-md text-muted-foreground">
                      {event.event_type || "Event"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(event.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="line-clamp-1">
                        {event.location || "TBA"}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full mt-auto"
                    asChild
                  >
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10 sm:hidden">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000020,#00000000)]" />
        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Ready to Take the Field?
          </h2>
          <p className="text-xl mb-10 text-primary-foreground/90 leading-relaxed">
            Join thousands of players already organizing games, joining groups,
            and dominating local tournaments.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg font-bold rounded-full w-full sm:w-auto shadow-2xl hover:scale-105 transition-transform"
            asChild
          >
            <Link href="/register">Get Started For Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
