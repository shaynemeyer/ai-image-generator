import { BackgroundPattern } from "@/components/backgrounds/BackgroundPattern";
import HeroImageSlider from "@/components/display/HeroImageSlider";
import GenerateImageInput from "@/components/forms/GenerateImageInput";
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";
import ImageSlider from "@/components/image/ImageSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import {
  Gift,
  ImageIcon,
  MessageCircleIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const logos = [
  "/logos/google.png",
  "/logos/vercel.png",
  "/logos/clerk.png",
  "/logos/drizzle.png",
  "/logos/openai.png",
];

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <main>
        <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center justify-center overflow-hidden">
          <BackgroundPattern />
          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-pulse">
                AI Image Generator
              </span>
            </h1>
            <h4 className="text-lg sm:text-xl md:text-2xl my-8">
              Unleash your creativity with our AI-powered text-to-image
              generator. Perfect for artists, marketers and dreamers.
            </h4>
            <div className="w-full max-w-2xl mx-auto">
              {" "}
              {/* Adjusted to take wider space */}
              {user && <GenerateImageInput />}
            </div>
            <p>
              {user
                ? "What image are you generating today?"
                : "Sign in now and get 5 free image generation credits when signing up."}
            </p>
          </div>
        </section>

        <section>
          <div className="my-20 mx-2">
            <HeroImageSlider />
          </div>
        </section>

        <section className="mt-36 w-full bg-gradient-to-t from-gray-100 to-gray-500 dark:from-gray-800 dark:to-gray-900 pt-20">
          <div className="px-4 pb-28">
            <h2 className="text-5xl font-bold tracking-tighter sm:text-5xl text-center mb-20 text-gray-900 dark:text-gray-100">
              Try it for Free
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                    Free Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center flex flex-col items-center">
                  <AnimatedIcon icon={Gift} color="text-green-500" />
                  <div className="mt-4 space-y-2">
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      5 Credits
                    </p>
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      Free
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      On Signup
                    </p>
                  </div>
                  <Button className="mt-6 w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white">
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                    Starter Pack
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center flex flex-col items-center">
                  <AnimatedIcon icon={ImageIcon} color="text-yellow-500" />
                  <div className="mt-4 space-y-2">
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      10 Credits
                    </p>
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      $2
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      One-time purchase
                    </p>
                  </div>
                  <Button className="mt-6 w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white">
                    <Link href="/buy-credits">Buy Now</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                    Popular Pack
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center flex flex-col items-center">
                  <AnimatedIcon icon={ImageIcon} color="text-pink-500" />
                  <div className="mt-4 space-y-2">
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      30 Credits
                    </p>
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      $5
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      One-time purchase
                    </p>
                  </div>
                  <Button className="mt-6 w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white">
                    <Link href="/buy-credits">Buy Now</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                    Pro Pack
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center flex flex-col items-center">
                  <AnimatedIcon icon={ImageIcon} color="text-blue-500" />
                  <div className="mt-4 space-y-2">
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      65 Credits
                    </p>
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      $10
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      One-time purchase
                    </p>
                  </div>
                  <Button className="mt-6 w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white">
                    <Link href="/buy-credits">Buy Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-8">
          <BackgroundPattern className="absolute inset-0" />
          <div className="relative z-10 w-full pb-2">
            <h1 className="font-bold mb-8 text-center text-white">
              Artistic Wonders Crafted by Our Users
            </h1>
            <ImageSlider images={[]} />
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-500 via-white to-gray-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 py-16 sm:py-20">
          <div className="px-4 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl text-gray-900 dark:text-gray-100 font-bold tracking-tighter sm:text-5xl text-center mb-12 sm:mb-16">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                    Describe Your Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <AnimatedIcon icon={Sparkles} color="text-purple-500" />
                  <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
                    Simply type a description of the image you want to create.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                    AI Magic
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <AnimatedIcon icon={Zap} color="text-blue-500" />
                  <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
                    Our AI will analyze your description and create an image
                    that captures the essence of your vision.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                    Get Your Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <AnimatedIcon icon={ImageIcon} color="text-green-500" />
                  <p className="text-center text-gray-700 dark:text-gray-300 mt-4">
                    Download your AI-generated image in high quality, ready to
                    use.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full max-w-3xl text-center pt-10 pb-12 mx-auto">
          <div className="w-full overflow-hidden">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-5 text-gray-900 dark:text-gray-100">
              Get Unlimited access to AI Generated HD Images
            </h2>
            <p className="text-center mb-10">
              for your <strong>website</strong>,{" "}
              <strong>social media posts</strong>, <strong>blogs</strong>,{" "}
              <strong>advertisement</strong>, <strong>marketing</strong>, and
              more
            </p>
            <Button className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold text-lg py-4 px-8 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 w-full max-w-ws mx-auto">
              <Sparkles className="w-6 h-6 mr-3" />
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="w-full pt-10 pb-12 bg-white">
          <div className="w-full overflow-hidden">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Powered By
            </h3>

            <div className="flex animate-scroll">
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/7 p-6 mx-4"
                >
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src={logo}
                      alt={`Logo ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-auto object-contain max-w-[120px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-white">
              Get In Touch
            </h2>
            <div className="max-w-md mx-auto text-center">
              <p className="mb-8 text-gray-200">
                Have questions or need support? We&apos;re here to help!
              </p>
              <Button className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold text-lg py-4 px-8 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 w-full max-w-xs mx-auto">
                <MessageCircleIcon className="w-6 h-6 mr-3" />
                <Link href="/chat">Chat Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
