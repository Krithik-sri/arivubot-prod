"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useParams } from "next/navigation";

export default function ChatBotSettings() {
  const params = useParams();
  const id = params.slug;

  return (
    <div className="space-y-8 mx-10">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="chatbot-id">Chatbot ID</Label>
            <div className="flex gap-2">
              <Input
                id="chatbot-id"
                value={id}
                readOnly
                className="font-mono"
              />
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy chatbot ID</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Enter Your chatbot Name it Cannot be Empty"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="credit-limit">Credit Limit</Label>
            </div>
            <Switch id="credit-limit" />
          </div>
          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="text-center text-sm text-red-500 uppercase font-medium tracking-wider">
          Danger Zone
        </div>
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-red-500">Delete Chatbot</h3>
                <p className="text-sm text-muted-foreground">
                  Once you delete your chatbot, there is no going back. Please
                  be certain.
                  <br />
                  All your uploaded data will be deleted.{" "}
                  <span className="font-medium">
                    This action is not reversible
                  </span>
                </p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
