"use client"
import { Check, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Connect() {
  const params = useParams();
  const id = params.slug;

  const [copied, setCopied] = useState(false);

  //   const scriptContent = `
  // <script>
  // window.apiKey ='${id}';
  // </script>
  // <script src="https://${window.location.hostname}/chatbot.min.js">
  // </script>
  // `;

  const scriptContent = `<script src="https://${window.location.hostname}/arivubot.min.js?apiKey=${id}"></script>`


  const handleCopy = () => {
    navigator.clipboard.writeText(scriptContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  const clientApi = process.env.NEXT_PUBLIC_FRONTEND_API;

  return (
    <div className="flex ">
      <main className="flex-1 p-6">
        <Tabs defaultValue="embed">
          <TabsList>
            <TabsTrigger value="embed">Embed</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="embed">
            <Card>
              <CardHeader>
                <CardTitle>Embed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* <div>
                  <h3 className="mb-2 font-semibold">www.chatbase.co</h3>
                  <p className="text-sm text-gray-500">
                    To add the chatbot anywhere on your website, add this iframe
                    to your HTML code.
                  </p>
                  <div className="mt-2 rounded-md bg-gray-100 p-4">
                    <pre className="text-sm">
                      <code>
                        {`<iframe
                          src="https://www.chatbase.co/chatbot-iframe/OX9JzW4g9EYf-3PbPXicl"
                          width="100%"
                          style="height: 100%; min-height: 700px"
                          frameborder="0"
                          ></iframe>`}
                      </code>
                    </pre>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Check className="mr-2 h-4 w-4" />
                    Copy iframe
                  </Button>
                </div> */}
                <div>
                  <p className="mb-2 text-sm text-gray-500">
                    To add a chat bubble to the bottom right of your website,
                    add this script tag to your HTML.
                  </p>
                  <div className="rounded-md bg-gray-100 p-4">
                    <pre className="text-sm">
                      {/* <code>
                        {`<script>
window.apiKey ='${id}';
</script>
<script src="https://${window.location.hostname}/chatbot.min.js">
</script>`}
                      </code> */}

                      <code>
                        {`<script src="https://${window.location.hostname}/arivubot.min.js?apiKey=${id}"></script>`}
                      </code>
                    </pre>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={handleCopy}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    {copied ? "Copied!" : "Copy Script"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="share">
            <Card>
              <CardHeader>
                <CardTitle>Share</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="mb-2 font-semibold">www.chatbase.co</h3>
                  <p className="text-sm text-gray-500">
                    To add the chatbot anywhere on your website, add this iframe
                    to your HTML code.
                  </p>
                  <div className="mt-4 rounded-md bg-gray-50 p-3">
                    <p className="text-sm text-gray-600">
                      https://www.chatbase.co/chatbot-iframe/OX9JzW4g9EYf-3PbPXicl
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Image
                          src="/placeholder.svg"
                          alt="Zapier"
                          className="h-8 w-8"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h3 className="mb-2 font-semibold">Zapier</h3>
                      <p className="mb-4 text-sm text-gray-500">
                        Connect your chatbot with thousands of apps using
                        Zapier.
                      </p>
                      <Button variant="outline" className="w-full">
                        Subscribe to enable
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Image
                          src="/placeholder.svg"
                          alt="Slack"
                          className="h-8 w-8"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h3 className="mb-2 font-semibold">Slack</h3>
                      <p className="mb-4 text-sm text-gray-500">
                        Connect your chatbot with Slack, mention it, and have it
                        reply to any message.
                      </p>
                      <Button variant="outline" className="w-full">
                        Subscribe to enable
                      </Button>
                    </CardContent>
                  </Card>
                  {/* Add other integrations as needed */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
