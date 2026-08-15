import { GoalCard } from "@/features/home/components/goal-card";
import { HomeHeader } from "@/features/home/components/home-header";
import { HomeSection } from "@/features/home/components/home-section";
import { PlaceholderCard } from "@/features/home/components/placeholder-card";
import {
  activeGoals,
  activeGoalsSection,
  homeHeaderContent,
  placeholderSections,
} from "@/features/home/mock-data";

export function HomeScreen() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] px-5 py-12 sm:px-6 sm:py-20">
      <HomeHeader content={homeHeaderContent} />

      <div className="space-y-12 sm:space-y-14">
        <HomeSection
          id={activeGoalsSection.id}
          title={activeGoalsSection.title}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {activeGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </HomeSection>

        {placeholderSections.map((section) => (
          <HomeSection
            key={section.id}
            id={section.id}
            title={section.title}
          >
            <PlaceholderCard />
          </HomeSection>
        ))}
      </div>
    </main>
  );
}
