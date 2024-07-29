"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { PostCard } from "./PostCard";
import { posts } from "@/data/posts";

export function PostsSection() {
    return (
        <section className="w-full">
            <div className=" max-w-7xl container relative">
                <div className="bg-themecolorprimary rounded-[10px] absolute w-10/12 h-5/6"></div>
                <div className="relative pl-10 sm:pl-20 pt-10 sm:pt-20 space-y-10">
                    <h2 className="text-white text-4xl sm:text-5xl font-bold">good things</h2>

                    <Swiper
                        slidesPerView={1}
                        modules={[Pagination]}
                        pagination={{ clickable: true}}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            940: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {posts.map((post, index) => (
                            <SwiperSlide key={index}>
                                <PostCard
                                    title={post.title}
                                    image={post.image}
                                    category={post.category}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}