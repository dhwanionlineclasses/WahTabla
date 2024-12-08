"use client";

// import { Button } from '@/components/ui/button'
// import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { getUserLocation } from "@/action/get-user-location";
import CaraousalCourseCard from "@/components/caraousal-course-cards";
// import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import { Skeleton } from "@/components/ui/skeleton";


const HomePage = () => {
  // const [currentIndex, setCurrentIndex] = useState(0); // Track which badge is active
  // const [isAnimating, setIsAnimating] = useState(true);
  const [country, setCountry] = useState<string>('DEFAULT');

  useEffect(() => {
    // const fetchLocation = async () => {
    //   const location = await getUserLocation();
    //   setCountry(location.country);

    // };

    const fetchLocation = async () => {
      try {
        const response = await fetch('/api/location');
        const data = await response.json();
        setCountry(data.country);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsAnimating(false); // Start fade-out
  //     setTimeout(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length); // Change badge
  //       setIsAnimating(true); // Start fade-in
  //     }, 500); // 500ms fade-out duration
  //   }, 3500); // 3 sec visible + 0.5 sec fade-out

  //   return () => clearInterval(interval); // Clean up interval on unmount
  // }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pt-20">
      <section
        id="home"
        className="w-full flex flex-col justify-start items-center gap-4"
      >
        <div className="flex justify-center items-center gap-2 px-4 py-2 relative">
          <Image
            src="/icons/abstract-line.svg"
            alt="arrow"
            width={0}
            height={0}
            className="w-6 absolute -top-4 -left-4 sm:-top-6 sm:-left-6"
          />
          <Image
            src="/icons/tabla.svg"
            alt="arrow"
            width={0}
            height={0}
            className="hidden sm:block w-10 p-2"
          />
          <Image
            src="/icons/sign-hero.svg"
            alt="arrow"
            width={0}
            height={0}
            className="w-6 p-1 sm:hidden bg-tertiary"
          />
          <p className="text-base sm:text-4xl text-center font-semibold">
            <span className="text-[#FF9500] sm:text-black">Unlock</span> your
            Musical Potential
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-2xl sm:text-3xl text-center">
            with our curated Tabla Course
          </p>
          <p className="text-xs sm:text-sm text-center">
            Learn from the best Gurus and Enhance Your Skills.
          </p>
        </div>
        <div className="flex gap-2 pt-4">
          <Link href="/#pricing">
            <Button>Buy Now</Button>
          </Link>
          <Link href="/#pricing">
            <Button variant="outline">View Pricing</Button>
          </Link>
        </div>
        {/* <Image
          src="/table-hero.jpeg"
          alt="arrow"
          width={0}
          height={0}
          className="w-[1100px] p-2 bg-tertiary pt-4 rounded-lg"
        /> */}
        {/* <AspectRatio ratio={16 / 9} className="pointer-events-none max-h-[800px] rounded-sm flex items-start justify-center"> */}
        <div className="relative w-[80%] max-w-[800px] max-h-[800px] bg-black h-full aspect-video my-8">
          <iframe
            src="https://player.vimeo.com/video/1025477798?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;mute=1&amp;controls=0&amp;showinfo=0"
            allow="autoplay"
            className="absolute top-0 left-0 w-full h-full"
            title="Pexels Videos 1851190"
          ></iframe>
        </div>
        {/* </AspectRatio> */}
      </section>
      <Card
        id="features"
        className="w-full bg-transparent shadow-none border-none mt-6"
      >
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Introduction</CardTitle>
          {/* <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-2">
            <span className="max-w-[700px]">
              Our course offers a range of features tailored to enhance your
              learning experience, from hands-on guidance to performance
              opportunities and flexible learning options.
            </span>
            <Button variant="secondary">Buy Now</Button>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="bg-primary text-white px-12 py-10 rounded-sm">
          {/* <ul className="list-disc text-sm text-white leading-6">
            <li>
              The course is designed to make you a{" "}
              <strong>full-fledged Tabla player</strong> with hands-on guidance
              if needed.
            </li>
            <li>
              You will gain both <strong>theoretical knowledge</strong> and{" "}
              <strong>practical proficiency</strong> in playing the Tabla.
            </li>
            <li>
              The course is structured for five years, but dedicated students
              can complete it faster.
            </li>
            <li>
              Each year is divided into four modules to ensure structured
              progress.
            </li>
            <li>
              After completing the first year (four modules), you will receive a
              certificate of completion.
            </li>
            <li>
              After completing the second year, you will receive the{" "}
              <strong>Dhwani certificate</strong> and become eligible to perform
              in annual student concerts in Kolkata, Pune, Los Angeles, or New
              York.
            </li>
            <li>
              By the end of the third year, you will be able to accompany both
              vocal and instrumental music, including Bhajans and Geets.
            </li>
            <li>
              Completing the fifth year will earn you the Dhwani certificate
              again, allowing you to perform solo or duet at annual concerts.
            </li>
            <li>
              The full course is{" "}
              <strong>equivalent to a bachelor&apos;s degree in Tabla.</strong>
            </li>
            <li>
              Graduates can become teachers at the academy and earn through
              teaching or performing in concerts.
            </li>
            <li>
              You can pursue two additional years of study to reach mastery and
              teach intermediate students at Dhwani Academy
            </li>
          </ul> */}
          <p>
            The tabla learning course is designed uniquely with hand on help if
            needed to make you a full-fledged tabla player and nurture your
            talent of music. After completing this course of five years, you
            will come to know about the subject theoretically and will be able
            to play up to your satisfaction. The full course completion needs
            five years, but you can make it earlier if you are an ardent student
            and lover of music.
            <br></br>
            <br></br>
            Each year the course is divided into four modules to guide you to
            reach a standard to go for the next module. After completion of the
            first year comprised of four modules, we will provide you with a
            certificate of completion. After completion of 2nd year, you will
            get a certificate of completion Dhwani ……… This will enable you to
            participate in one of our annual student concerts held in Kolkata,
            Pune, Los Angeles and New York (depending on your location)
            <br></br>
            <br></br>
            Continuing another three years, you will be in a standard to perform
            with Vocal and instrumental music of good standard and will be able
            to to play with light classical songs like Bhajans and Geets.
            <br></br>
            <br></br>
            Completion of 5th year will enable you to achieve Dhwani……. This
            will give you the coveted chance to perform for our annual concerts,
            solo/duet depending on time and slots. You will be in a standard to
            perform by yourself tabla solo in any place. This is a course
            equivalent to a bachelors degree. You can start teaching under our
            academy course as one of our teachers and can start earning by
            teaching and also by organizing and performing for our concerts and
            outside.
            <br></br>
            <br></br>
            To be a real Master of Art of Tabla, you must carry on your
            pursuance and performances and have to go through some in person
            classes along with online classes and can completer two more years
            and can be a teacher of intermediate students of Dhwani Academy.
          </p>
        </CardContent>
      </Card>
      <Card
        id="benefits"
        className="w-full bg-transparent shadow-none border-none mt-6 px-0"
      >
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Features & Benefits</CardTitle>
          {/* <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-2">
            <span className="max-w-[700px]">
              Unlock your musical potential with immersive learning, hands-on
              guidance, and opportunities to perform, teach, and grow
              professionally.
            </span>
            <Button variant="secondary">Buy Now</Button>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0 relative h-full min-h-[400px] sm:min-h-[300px] md:min-h-[300px] lg:min-h-[250px] mb-6">
          {/* <Image
            src="/benefits-bg.jpg"
            alt="arrow"
            width={0}
            height={0}
            className="w-full object-cover h-[200px] tablet:h-full rounded-lg"
          /> */}
          <div className="w-full h-full flex justify-center items-center absolute top-0 z-20">
            {/* <div className="lg:hidden relative flex justify-center items-center w-full h-full mx-auto overflow-hidden">
              {benefits.map((benifit, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-12 px-2 flex items-center justify-center rounded-lg
                ${
                  isAnimating && index === currentIndex
                    ? "animate-fadeInUp"
                    : "animate-fadeOutUp"
                } 
                `}
                >
                  <div className="max-w-[500px] flex justify-start items-center sm:gap-4 py-2 px-4 sm:py-4 sm:px-4 text-xs md:text-sm bg-primary text-white rounded-lg shadow-md">
                    <Image
                      src={benifit.icon}
                      alt="arrow"
                      width={0}
                      height={0}
                      className="w-6 h-6"
                    />
                    {benifit.description}
                  </div>
                </div>
              ))}
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 relative">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="w-full h-auto sm:h-24 md:h-28 px-2 py-2 flex items-stretch justify-center rounded-lg"
                  initial={{
                    opacity: 0,
                    y: 20,
                    // Initial position is centered in the viewport (not absolute)
                    transform: "translateY(50%)", // Moves the card down initially
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0, // Animate to original position
                    transform: "translateY(0)", // Final position at normal grid location
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1, // Stagger the animations
                  }}
                >
                  <div className="max-w-[450px] flex justify-start items-center sm:gap-4 py-2 px-4 sm:py-4 sm:px-4 text-xs md:text-sm bg-primary text-white rounded-lg shadow-md">
                    <Image
                      src={benefit.icon}
                      alt="icon"
                      width={0}
                      height={0}
                      className="w-6 h-6"
                    />
                    {benefit.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="w-full flex flex-col justify-start items-start gap-6 pt-6">
        {/* <h1 className="text-2xl font-medium">Who & Requirements</h1> */}
        <div className="w-full flex flex-wrap tableto:flex-nowrap justify-between items-stretch gap-6">
          <div className="relative min-w-[300px] w-full min-h-[240px] rounded-lg flex flex-col justify-start items-center gap-4 px-6 py-10 text-center text-white bg-primary">
            <p className="text-2xl font-semibold max-w-[300px]">
              No preconception of Tabla is necessary.
            </p>
            <p className="text-xs max-w-[250px]">
              Students can pursue this course even if they have no prior
              knowledge of Tabla.
            </p>
            <span className="absolute -bottom-6 w-20 h-20 rounded-full bg-background flex justify-center items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </span>
          </div>
          <div className="min-w-[300px] w-full rounded-lg flex flex-col justify-center items-center gap-4 px-6 py-10 text-center text-white bg-primary">
            <p className="text-2xl font-semibold">WHO THIS COURSE IS FOR</p>
            <li className="text-xs text-left list-inside max-w-[600px]">
              Anyone who wants to learn tabla from the beginning learn, to
              perform and teach professionally and pursue it more than a hobby
              and make it a side profession.
            </li>
            <li className="text-xs text-left list-inside max-w-[600px]">
              Having some knowledge of Indian Rhythm and can incorporate the
              rhythm of Tabla to drums or any other instruments such as Guitar
              or base Guitar or Zembe or similar percussion instruments
            </li>
          </div>
          <div className="relative min-w-[300px] w-full min-h-[240px] rounded-lg flex flex-col justify-start items-center gap-4 px-6 py-10 text-center text-white bg-primary">
            <p className="text-2xl font-semibold max-w-[300px]">
              No preconception of Tabla is necessary.
            </p>
            <p className="text-xs max-w-[250px]">
              Students can pursue this course even if they have no prior
              knowledge of Tabla.
            </p>
            <span className="absolute -bottom-6 w-20 h-20 rounded-full bg-background flex justify-center items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </span>
          </div>
        </div>
      </div>
      <CaraousalCourseCard />
      
      {/* <Card id="module" className="w-full bg-transparent shadow-none border-none mt-6">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Course Modules</CardTitle>
          <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-2">
            <span className="max-w-[700px]">
              Our Tabla course is structured into progressive modules, each
              designed to guide you step by step from foundational skills to
              advanced mastery.
            </span>
            <Button variant="secondary">View All</Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-10 desktop:gap-y-10">
            {courses &&
              courses.map((course, index) => {
                return (
                  <Card key={index} className="laptop:py-6">
                    <CardHeader className="flex justify-center items-center">
                      <Image
                        src="/course-thumbnail.png"
                        alt="arrow"
                        width={0}
                        height={0}
                        className="z-10 w-full bg-primary p-10 py-16 sm:p-12 md:p-20 desktop:px-32 rounded-sm "
                      />
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="w-full flex flex-col sm:flex-col lg:flex-row justify-between items-start sm:items-start lg:items-center gap-4">
                        <div className="flex justify-start items-center gap-2">
                          <Badge variant="outline" className="py-2 px-4">
                            {course.duration}
                          </Badge>
                          <Badge variant="outline" className="py-2 px-4">
                            {course.level}
                          </Badge>
                        </div>
                        <span className="text-sm tablet:text-base desktop:text-lg">
                          {course.instructor}
                        </span>
                      </div>
                      <CardHeader className="px-0">
                        <CardTitle className="text-xl">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                    </CardContent>
                    <CardFooter>
                      <Link href='/profile' className="w-full">
                      <Button variant="secondary" className="w-full">
                        Get it Now
                      </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card> */}
      <Card className="w-full bg-transparent shadow-none border-none mt-6">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Module Features</CardTitle>
          {/* <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-3">
            <span className="max-w-[700px]">
              Our Tabla course is include industry first features, designed to
              provide learners the best and world-class experiences, and for
              them to make the most of the learning experience.
            </span>
            <Button variant="secondary">View All</Button>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4 gap-4 md:gap-8 px-0">
          {moduleFeatures.map((item, index) => (
            <Badge
              key={index}
              className="bg-primary text-white shadow-md px-4 py-2 flex justify-center items-center gap-2 hover:bg-primary text-lg "
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={0}
                height={0}
                className="w-6 text-white"
              />
              <span>{item.name}</span>
            </Badge>
          ))}
        </CardContent>
      </Card>
      <Card className="w-full bg-transparent shadow-none border-none mt-6">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Our Testimonials</CardTitle>
          {/* <CardDescription className="flex flex-col tablet:flex-row justify-between items-start gap-2">
            <span className="max-w-[700px]">
              See What Our Students Are Saying
            </span>
            <Button variant="secondary">View All</Button>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-10 desktop:gap-y-10">
            {testimonials &&
              testimonials.map((review, index) => {
                return (
                  <Card
                    key={index}
                    className="pb-0 rounded-sm bg-primary text-white"
                  >
                    <CardHeader className="border-b border-b-muted/20">
                      <CardDescription className="text-white">
                        {review.review}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 bg-primary">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-4">
                          <Image
                            src={review.image}
                            alt={review.name}
                            width={0}
                            height={0}
                            className="w-8"
                          />
                          <span>{review.name}</span>
                        </div>
                        <Button variant="secondary" size="sm">
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-primary shadow-none border-none text-white pb-0 mt-6">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl">ABOUT THE INSTRUCTOR</CardTitle>
          <CardDescription className="flex flex-col laptop:flex-row justify-center md:justify-between items-center laptop:items-start gap-2 pt-4 relative">
            <span className=" laptop:text-base text-white">
              Abhijit Banerjee is one of the top-ranking Indian musicians of
              present generation. A disciple of the illustrious guru, the late
              Pt. Jnan Prakash Ghosh, featured in all prominent festivals in
              India and abroad, Abhijit has collaborated with Grammy Winners
              international musicians like L. Shenkar, Ry Cooder, Larry Coryell,
              and Denmark Radio Jazz Orchestra. Besides being featured in
              prestigious venues like Carnegie Hall NY, Palais in Brussels,
              Queen Elizabeth Hall, London, Abhijit is now the Head of the
              department of Tabla in Chinmaya Viswa Vidyapeeth University, Pune
              and an adjunct faculty in the college of New Jersey (TCNJ). Apart
              from his contributions to Indian music he has left his mark in a
              diverse field of crossover music, both as a performer and a
              composer. Abhijit has more than 55 audio and video publications
              throughout the world. Abhijit is a recipient of APPEX fellowship
              from UCLA. In his academic life he is a graduate in English
              literature and postgraduate in Journalism. Abhijit is the founder
              and inspiration of DHWANI ACADEMY in INDIA and the US, started
              with the aim of promotion of Indian cultural heritage.
            </span>
            <Image
              src="/instructor.png"
              alt="arrow"
              width={0}
              height={0}
              className="w-[300px] laptop:w-[400px] relative bottom-0"
            />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card
        id="pricing"
        className="w-full bg-transparent shadow-none border-none mt-6"
      >
        <Tabs defaultValue="monthly">
          <div className="flex flex-col tablet:flex-row justify-between items-end gap-2">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl">Our Pricing</CardTitle>
              {/* <CardDescription className="">
                <span className="max-w-[700px]">
                  We have a comprehensive pricing scheme for courses to be
                  bought monthly, yearly or even module-wise, as per your
                  learning experience.
                </span>
              </CardDescription> */}
            </CardHeader>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </div>
          <CardContent className="bg-primary text-white pt-6 px-10 py-10 rounded-xl">
            <TabsContent value="monthly">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-28 desktop:gap-y-10 bg-primary">
                <Card className="pb-0 rounded-sm bg-primary text-white shadow-none border border-muted/20">
                  <CardHeader className="flezx justify-start items-center gap-4">
                    <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none ">
                      Monthly Plan
                    </Button>
                    <span className="drop-shadow-3xl">
                      <span className="text-5xl font-semibold">
                        {country === "IN" ? "₹100" : "$100"}
                      </span>
                      <span className="text-sm">/month</span>
                    </span>
                  </CardHeader>
                  <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                    <p>Available Features</p>
                    <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Pay as you learn</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Flexible monthly payments</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Cancel anytime</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Access to all current lessons</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Affordable for beginners</span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-white text-primary hover:bg-muted">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="pb-0 rounded-sm bg-primary shadow-none border-muted/20">
                  <CardHeader className="flezx justify-start items-center gap-4">
                    <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none border border-muted/20">
                      Module Plan
                    </Button>
                    <span className="drop-shadow-3xl">
                      <span className="text-5xl font-semibold text-white">
                        {country === "IN" ? "₹300" : "$300"}
                      </span>
                      <span className="text-sm text-white">/month</span>
                    </span>
                  </CardHeader>
                  <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                    <p>Available Features</p>
                    <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>One-time payment per module</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Save more with bulk purchase</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Full access for 3 months</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Progress at your own pace</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Ideal for committed learners</span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-white text-primary hover:bg-muted">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="yearly">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-6 md:gap-10 desktop:gap-x-28 desktop:gap-y-10">
                <Card className="pb-0 rounded-sm bg-primary shadow-none border-muted/20">
                  <CardHeader className="flezx justify-start items-center gap-4">
                    <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none border border-muted/20">
                      Yearly Plan
                    </Button>
                    <span className="drop-shadow-3xl">
                      <span className="text-5xl font-semibold text-white">
                        {country === "IN" ? "₹1200" : "$1200"}
                      </span>
                      <span className="text-sm text-white">/year</span>
                    </span>
                  </CardHeader>
                  <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                    <p>Available Features</p>
                    <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Pay as you learn</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Flexible monthly payments</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Cancel anytime</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Access to all current lessons</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Affordable for beginners</span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-white text-primary hover:bg-muted">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="pb-0 rounded-sm bg-primary shadow-none border-muted/20">
                  <CardHeader className="flezx justify-start items-center gap-4">
                    <Button className="bg-background w-full rounded-sm text-xs text-tertiary-foreground hover:bg-background cursor-default shadow-none border border-muted/20">
                      Module Plan
                    </Button>
                    <span className="drop-shadow-3xl">
                      <span className="text-5xl font-semibold text-white">
                        {country === "IN" ? "₹1100" : "$1100"}
                      </span>
                      <span className="text-sm text-white">/month</span>
                    </span>
                  </CardHeader>
                  <CardContent className="pt-6 bg-primary text-white flex flex-col justify-center items-center gap-4">
                    <p>Available Features</p>
                    <div className="w-full sm:px-10 flex flex-col justify-center items-center gap-2">
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>One-time payment per module</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Save more with bulk purchase</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Full access for 3 months</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Progress at your own pace</span>
                      </span>
                      <span className="w-full flex justify-start items-center gap-4 border border-muted/20 px-4 py-2 pointer-events-none cursor-default bg-transparent hover:bg-transparent shadow-none rounded-sm text-white text-sm">
                        <Image
                          src="/icons/tick.svg"
                          alt="tick"
                          width={0}
                          height={0}
                          className="w-6 p-1 bg-tertiary rounded-sm"
                        />
                        <span>Ideal for committed learners</span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-white text-primary hover:bg-muted">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
      <Card className="w-full flex flex-col md:flex-row lg:gap-32 justify-between items-start bg-primary text-white shadow-none border-none mt-6 py-10 laptop:px-10">
        <CardHeader className="max-w-[340px]">
          <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
          <CardDescription className="flex flex-col justify-between items-start gap-2">
            <span className="max-w-[700px] text-primary-foreground">
              Still you have any questions? Contact our Team via
              courses@dhwaniacademy.net
            </span>
            <Button variant="outline" className="mt-6 bg-white text-primary">
              See All FAQ&apos;s
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="pb-6 text-base text-left hover:no-underline">
                Can I buy multiple modules at once?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="pb-6 border-b border-b-muted text-base text-left hover:no-underline">
                What kind of support can I expect from instructors?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="pb-6 border-b border-b-muted text-base text-left hover:no-underline">
                Are the courses self-paced or do they have specific start and
                end dates?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="pb-6 border-b border-b-muted text-base text-left hover:no-underline">
                Are there any prerequisites for the courses?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="pb-6 border-b border-b-muted text-base text-left hover:no-underline">
                Can I download the course materials for offline access?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col justify-start items-start gap-6 pt-6 text-white">
                Absolutely! You can buy all the modules or a selected number of
                modules at the same time and access them at your convenience.
                <Button
                  variant="secondary"
                  className="w-full flex justify-between items-center px-4 py-8"
                >
                  <span>Buy all module at once</span>
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="arrow"
                    width={0}
                    height={0}
                    className="w-8 p-2 bg-white text-primary rounded-full"
                  />
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;

// const courses = [
//   {
//     duration: "3 Months",
//     level: "Beginner",
//     instructor: "By Pandit Abhijit Banerjee",
//     title: "Prathama (1st Year) : Module 1",
//     description:
//       "Begin your journey by mastering the fundamental strokes and hand techniques essential for playing Tabla. These basics will form the core of your future learning and performance skills.",
//   },
//   {
//     duration: "3 Months",
//     level: "Intermediate",
//     instructor: "By Pandit Abhijit Banerjee",
//     title: "Prathama (1st Year) : Module 2",
//     description:
//       "Explore key rhythmic patterns and basic compositions, honing your ability to play with precision and confidence. This module helps you understand how to apply rhythm in a musical context.",
//   },
//   {
//     duration: "3 Months",
//     level: "Intermediate",
//     instructor: "By Pandit Abhijit Banerjee",
//     title: "Prathama (1st Year) : Module 3",
//     description:
//       "Dive into the theoretical aspects of Tabla, learning its structure and significance in classical music. You'll gain a deeper understanding of rhythm and how to integrate it into your practice.",
//   },
//   {
//     duration: "3 Months",
//     level: "Advanced",
//     instructor: "By Pandit Abhijit Banerjee",
//     title: "Prathama (1st Year) : Module 4",
//     description:
//       "By the end of the first year, you'll be playing simple solo pieces and learning the basics of accompaniment with vocal music, setting the stage for more complex performances in the future.",
//   },
// ];

const moduleFeatures = [
  {
    icon: "/icons/feature-1.svg",
    name: "Practical Demonstration",
  },
  {
    icon: "/icons/feature-2.svg",
    name: "Supporting PDF",
  },
  {
    icon: "/icons/feature-3.svg",
    name: "Theoritical Text",
  },
  {
    icon: "/icons/feature-4.svg",
    name: "Questions for Evaluation",
  },
];

const testimonials = [
  {
    review:
      "The lessons are clear, and the progression is perfect. I've grown so much in just a few months!",
    name: "Aditi S",
    image: "/review-1.jpg",
  },
  {
    review:
      "The video tutorials and PDFs make learning easy. I'm thrilled with my progress! I'm excited to learn more.",
    name: "Jason M",
    image: "/review-2.jpg",
  },
  {
    review:
      "Performing in a concert after two years of training was a dream come true. Highly recommend!",
    name: "Emily R",
    image: "/review-3.jpg",
  },
  {
    review:
      "The structured modules and expert guidance helped me master Tabla faster than I expected!",
    name: "Michael K",
    image: "/review-4.jpg",
  },
];

const benefits = [
  {
    icon: "/benefits/benefit-1.jpg",
    description:
      "Learn Basics to bachelors standard in five years with theory and practical knowledge.",
  },
  {
    icon: "/benefits/benefit-2.jpg",
    description:
      "Experience the stage shows with group performances after two years of learning our courses.",
  },
  {
    icon: "/benefits/benefit-3.jpg",
    description:
      "Doubt-clearing sessions that offer personalized support to answer all your questions .",
  },
  {
    icon: "/benefits/benefit-4.jpg",
    description:
      "Get the opportunity to attend workshops in different locations and one-on-one help to perfect your artistry.",
  },
  {
    icon: "/benefits/benefit-5.jpg",
    description:
      "Be a teacher with Dhwani's certificate and associate yourself with us to teach, perform, and earn.",
  },
  {
    icon: "/benefits/benefit-6.jpg",
    description:
      "All the course materials are available as downloadable PDFs and recordings.",
  },
];
