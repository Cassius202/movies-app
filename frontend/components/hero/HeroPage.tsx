'use client'

import { ButtonLink } from "../utility/buttons";
import { ImageSlider } from "./ImageSlider";

export default function HeroPage() {
  return (
    <div className="flex flex-col items-center relative justify-center isolate bg-zinc-950 w-full min-h-svh">
      <ImageSlider />
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold">Movie Watchlist</h1>
      <p className="mt-2 text-lg">Keep track of the movies you&rsquo;ve watched and want to see.</p>
      <div className="mt-10">
        <ButtonLink 
        href="/watchlist"
        className="bg-white text-black font-medium px-4 py-2 rounded">Get Started</ButtonLink>
      </div>
    </div>
  );
}
