"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { ChatBotCreation } from "@/app/actions/Chatbot";
import currentUser, { getUserId } from "@/app/actions/User";
import ModelLoader from "./ModelLoader";
import { useUserContext } from "@/context/userContext";

const Website = () => {
  const [url, setUrl] = useState<string>("");
  const [chatbotname, setChatbotName] = useState<string>("");
  const [data, setData] = useState<string[]>([
    "https://example.com/very-long-url-pathway-that-keeps-going-forever-123456789",
    "https://testsite.org/super/deep/nested/page/with/a/really/long/link-example",
    "https://randomwebsite.net/articles/this-is-a-really-long-url-for-testing-purposes-xyz",
    "https://myblog.com/posts/2025/02/this-is-how-you-write-a-long-url-in-a-dynamic-world",
    "https://onlinestore.com/products/category/sale/limited-offer-super-deal-unique-id",
    "https://newsportal.com/world/updates/everything-happening-right-now-in-detail-long-url",
    "https://techsite.dev/documentation/guides/how-to-deploy-nextjs-app-on-vercel-step-by-step",
    "https://university.edu/courses/2025/spring/computer-science/artificial-intelligence-deep-learning",
    "https://socialmedia.com/users/profile/123456789012345678901234567890/posts/recent-updates",
    "https://company.com/about-us/team/members/maharnav-sahu-full-profile-career-and-projects//maharnav-sahu-full-profile-career-and-projects//maharnav-sahu-full-profile-career-and-projects"
  ]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [modelTrain, setModelTrain] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();
  const { setChatbot } = useUserContext();

  const [inputType, setInputType] = useState("");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState(null);

  const [user, setUser] = useState<any>("");
  const [userid, setUserId] = useState<string>();

  //TODO: use the useSession hook instead of this
  useEffect(() => {
    async function fxxn() {
      try {
        const res = await currentUser();
        if (res?.user) {
          const result = await getUserId(res.user);
          setUser(result._id);
          setUserId(result._id);
        }
      } catch (e: any) {
        console.log(e);
      }
    }
    fxxn();
  }, []);

  const backgroundApi = process.env.NEXT_PUBLIC_BACKEND_API;

  const handleFetch = () => {
    setData([]);
    if (isFetching) {
      eventSource?.close();
      setEventSource(null);
      setIsFetching(false);
      setProgress(0);
      return;
    }
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }

    if (!url) return;

    setProgress(0);
    const newEventSource = new EventSource(
      `https://sr.adrig.co.in/chatlaps/links?url=${encodeURIComponent(url)}`
    );

    newEventSource.onopen = () => {
      console.log("✅ SSE Connected");
      setIsFetching(true);
    };

    newEventSource.onmessage = (event: MessageEvent) => {
      console.log("sdfghj", event)
      const newItem = event.data;

      setData((prevData) =>
        prevData.includes(newItem) ? prevData : [...prevData, newItem]
      );

      setProgress((prevProgress) => {
        const increment = Math.min(prevProgress + 2, 100);
        return increment;
      });
    };

    newEventSource.onerror = (err) => {
      console.log("error", err)
      newEventSource.close();
      setEventSource(null);
      setIsFetching(false);
      setIsTraining(true);
      setProgress(100);
    };
    setEventSource(newEventSource);
    setIsFetching(true);
  };


  function normalizeUrl(url: string): string {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }

  function extractBaseDomain(url: string): string {
    try {
      return new URL(url).origin;
    } catch (error) {
      console.error(`Invalid URL: ${url}`);
      return "";
    }
  }

  function processLinks(response: any[], baseUrl: string): string[] {
    const baseDomain = new URL(baseUrl).origin;
    const processedLinks = new Set<string>();

    response.forEach((link) => {
      try {
        if (!link || typeof link !== "string" || link.trim() === "") return;
        if (link.startsWith("mailto:") || link.startsWith("tel:") || link === "#!") return;
        if (link.startsWith("http")) {
          const linkDomain = new URL(link).origin;
          if (linkDomain === baseDomain) processedLinks.add(new URL(link).href);
        } else if (link.startsWith("/")) {
          processedLinks.add(`${baseDomain}${link}`);
        } else {
          processedLinks.add(`${baseDomain}/${link}`);
        }
      } catch (error) {
        console.error(`Invalid URL skipped: ${link}`);
      }
    });

    return Array.from(processedLinks);
  }

  // const handleFetch = async () => {
  //   setData([]);
  //   setIsFetching(true);

  //   try {
  //     if (!url) throw new Error("URL is required");

  //     const response = await axios.get("https://app.scrapingbee.com/api/v1/", {
  //       params: {
  //         api_key: "5X99ITOZIGTRC1IFTUUD8TCS4WVIUXBO373TV4T7NXOCHM1SQCX5SO72M00F5X5GKHWUCHOXJWUSWRP9",
  //         url: url,
  //         wait_browser: "load",
  //         extract_rules: '{"all_links":{"selector":"a@href","type":"list"}}',
  //       },
  //     });

  //     if (!response.data || !response.data.all_links) {
  //       throw new Error("Invalid response format: Missing all_links");
  //     }

  //     const finalLinks = processLinks(response.data.all_links, extractBaseDomain(url));
  //     setData(finalLinks);
  //     setIsTraining(true);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const handleChange = (event: any) => {
    if (event.target.type === "file") {
      setFile(event.target.files[0]);
      setInputType("file");
    } else if (event.target.tagName === "TEXTAREA") {
      setTextContent(event.target.value);
      setInputType("text");
    }
  };

  const handleTrainModel = async () => {
    try {
      setModelTrain(true);
      const response = await axios.post(`https://sr.adrig.co.in/chatlaps/scrape`, {
        links: data,
      });
      console.log(userid, "userid");
      if (userid) {
        const res = await ChatBotCreation(
          chatbotname,
          response.data.chatbotId,
          userid
        );
      }
      // d35b68cd-23f1-4402-82fc-6ce1872dd563
      setChatbot(response.data.chatbotId);
      router.push(`/space/playground`);
    } catch (error) {
      console.log("Error training model:", error);
      console.log("Error training the model. Please try again.");
    }
  };

  const handleDelete = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const chatbotCreationHandler = async () => {
    try {
      let response;
      if (inputType === "text" && textContent.trim() !== "") {
        response = await axios.post(`${backgroundApi}/texttrain`, {
          links: textContent,
        });
      } else if (inputType === "file" && file) {
        const formData = new FormData();
        formData.append("file", file);

        response = await axios.post(`${backgroundApi}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        console.error("No valid input provided for chatbot creation.");
        return;
      }

      if (userid) {
        await ChatBotCreation(chatbotname, response.data.chatbotId, userid);
      }

      router.push(`/space/bot/playarea/${response.data.chatbotId}`);
    } catch (error) {
      console.error("Error training model:", error);
      console.error("Error training the model. Please try again.");
    }
  };


  return (
    <div className="border-2 rounded-xl">
      <div className="h-[10vh] p-2 bg-gray-200 rounded-t-xl">
        <h2 className='p-4'><b>Website</b></h2>
      </div>
      <main className="flex-1 px-8 ">
        <div>
          <div className="mt-4 text-md text-gray-500">URL</div>
          <div className="space-y-4">

            <input
              id="websiteUrl"
              placeholder="https://www.example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setData([]);
                setIsFetching(false);
              }}
              className="border-none bg-gray-200 w-full rounded-lg"
            />
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleFetch}
                className="bg-blue-500 text-white"
                variant={isFetching ? "destructive" : "default"}
              >
                {isFetching && <Loader2 className="animate-spin" />}
                {isFetching ? "Stop Fetching" : "Pull more link"}
              </Button>
              {isTraining && !modelTrain && (
                <Button onClick={handleTrainModel} variant="outline">
                  Train Model
                </Button>
              )}
              {modelTrain && (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              )}
            </div>

            <div className="mt-6 pb-4">
              {!modelTrain ? (
                <div >
                  <div className="flex items-center w-full">
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                    <h3 className="mx-2 text-lg font-semibold">Include Links</h3>
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                  </div>

                  <ul className="flex flex-col mt-4  space-y-2 w-full max-h-96 overflow-y-auto">
                    {data.map((item, index) => (
                      <li
                        key={index}
                        className=" flex justify-between gap-2"
                      >
                        <span className="bg-gray-100 border border-gray-400 text-gray-600 text-sm pl-3 w-36 h-8 flex items-center border rounded-sm ">Trained</span>
                        <div className="bg-gray-100 border border-gray-400 text-gray-600 text-sm pl-3 w-full h-8 flex items-center border rounded-sm overflow-x-hidden  whitespace-nowrap text-ellipsis max-w-lg ">{item}</div>
                        <Button
                          onClick={() => handleDelete(index)}
                          variant="ghost"
                          className="text-red-500"
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className=" relative flex flex-col  space-y-2 w-full py-2 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-center mb-4">
                    Model Training
                  </h3>
                  <ModelLoader />
                </div>
              )}
            </div>
          </div>
        </div>


      </main>
    </div>
  )
}



export default Website