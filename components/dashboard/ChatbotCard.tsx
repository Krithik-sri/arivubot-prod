"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";

export default function ChatBotCard({
  name,
  chatbotId,
}: {
  name: string;
  chatbotId: string;
}) {
  const router = useRouter();
  const { setChatbot } = useUserContext();

  const buttonClickHandler = () => {
    setChatbot(chatbotId);
    router.push(`/space/playground`);
  };

  return (
    <Card className="group relative w-[300px] min-h-auto overflow-hidden border-none bg-gradient-to-br from-white to-gray-50 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      <CardHeader className="text-center">
        {/* <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black p-4 shadow-lg">
          <MessageSquare className="h-8 w-8 text-white" />
        </div> */}
        <h3 className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-xl font-bold text-transparent">
          {name}
        </h3>
      </CardHeader>
      <CardFooter className="justify-center gap-2">
        <Button
          onClick={buttonClickHandler}
          size="sm"
          className={cn(
            "boder-black",
            "transition-transform duration-500 hover:scale-105"
          )}
        >
          View Playground
        </Button>
      </CardFooter>
    </Card>
  );
}
