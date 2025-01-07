import React, { Component } from "react";
import Card from "./Card";
import { MdOutlineCalendarMonth } from "react-icons/md";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: Array(4)
        .fill()
        ?.map(() => ({
          createdAt: "12th April 2025",
          title: "Africa debit for 2024 April 2025",
          content: "logrm dnjhbre wdjbyudfbre 4rfueijvf cvrevtr hsthr sdur ",
        })),
    };
  }

  render() {
    const posts = this.state.posts;
    return (
      <div className="flex overflow-hidden flex-col self-stretch pb-14 my-auto bg-gray-50 max-md:max-w-full px-4">
        News
        {/* <div className="flex">
          {posts.length ? (
            <div className="flex">
              <div>
                <p className="flex items-center text-xs">
                  <span>
                    <MdOutlineCalendarMonth/>
                  </span>
                  <span className="px-2">16th Apr 2024</span>
                </p>

                <h2 className="font-bold">
                  Donations for the South African schools kids
                </h2>

                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  hic quo repellat sit dolorum praesentium atque, dolorem facere
                  asperiores expedita quos dolores aperiam, cumque cupiditate
                  aut veritatis iure quasi at!
                </p>
                <p className="text-blue-500">Read More</p>
              </div>
              <div>
                {posts?.map((post) => (
                  <Card data={post} />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div> */}

        <BigCard data={posts[0]}/>
      </div>
    );
  }
}


function BigCard({ data }) {
  return (
    <div className="mx-auto">
      <div className="flex">
        <p className="flex flex-col ">
          <span className="font-bold text-xl">{data.title}</span>
          <div className="flex items-center text-xs ">
            <span>
                <MdOutlineCalendarMonth/>
            </span>
            <span className="px-2">{data.createdAt}</span>
          </div>

          <div className="px-3">
            <img src={`${data.image}`} alt={data.title.toLowerCase()} />
          </div>

          <span>{data.content}</span>
        </p >

        
      </div>
    </div>
  );
}
