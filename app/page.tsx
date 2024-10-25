import HeroImageSlider from "@/components/display/HeroImageSlider";
import GenerateImageInput from "@/components/forms/GenerateImageInput";

export default function Home() {
  return (
    <div className="flex items-center justify-center m-5">
      <div className="grid max-w-4xl">
        <div className="my-10">
          <h1 className="text-7xl lg:text-9xl font-bold mb-2">
            <span className="block text-8xl bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-pulse">
              AI
            </span>{" "}
            Image Generator
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
            sapiente mollitia saepe eos omnis atque quisquam nostrum consectetur
            sit reprehenderit blanditiis ducimus eum earum repellendus incidunt,
            sunt culpa perferendis consequatur. Saepe, voluptas dignissimos.
            Distinctio soluta non exercitationem quasi unde, reprehenderit culpa
            perspiciatis illo? Repellat autem nihil fuga vel quod, odio ad ipsum
            quidem! Nemo quas minus quaerat adipisci ratione totam.
          </p>
        </div>
        <GenerateImageInput />

        <div className="relative">
          <HeroImageSlider />
        </div>
      </div>
    </div>
  );
}
