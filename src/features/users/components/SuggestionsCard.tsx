"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";

const suggestions = [
  {
    id: 1,
    name: "John Doe",
    username: "@johndoe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "@janedoe",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Bob Smith",
    username: "@bobsmith",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export function SuggestionsCard() {
  return (
    <Card className="border rounded-md shadow-lg">
      <CardContent className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-semibold leading-none">Who to follow</h5>
          <Link
            href="/explore"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            See all
          </Link>
        </div>
        <div>
          <ul role="list" className="divide-y divide-default">
            {suggestions.map((suggestion) => (
              <li className="py-4 sm:py-4" key={suggestion.id}>
                <div className="flex items-center gap-2">
                  <div className="shrink-0">
                    <Avatar>
                      <AvatarImage src={suggestion.avatar} />
                      <AvatarFallback>
                        {suggestion.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0 ms-2">
                    <h6 className="truncate text-sm font-semibold">
                      {suggestion.name}
                    </h6>
                    <p className="text-sm pl-0.5 text-muted-foreground truncate">
                      {suggestion.username}
                    </p>
                  </div>
                  <Button variant="default" className="cursor-pointer">
                    Follow
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
