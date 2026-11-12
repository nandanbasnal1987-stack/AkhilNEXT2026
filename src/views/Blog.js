'use client';

import React, { useState } from "react";
import Link from "next/link";
import { blogsData } from "@/data/blogs";

const bg_career = "/images/bg-career.png";





function Blog() {
 const [showMore, setShowMore] = useState(false);

  const LIMIT = 8;

  const displayedBlogs = showMore ? blogsData : blogsData.slice(0, LIMIT);

  // button show only when blogs are more than 6
  const shouldShowButton = blogsData.length > LIMIT;


  return (
    <>

      {/* Hero Section */}
      <div className="bg-client mb-5">
        <img src={bg_career} alt="client background" />
        <div className="box-clients-details" data-aos="fade-up">
          <h2>Akhil Systems Blog</h2>
          <p>
            Discover news, insights, and innovations shaping the future of
            healthcare technology.
          </p>
          <a href="#void" className="getStared">
            Get Started
          </a>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="container mb-5">
        <div className="row">
          {displayedBlogs.map((item) => (
            <div className="col-md-4 mb-4" key={item.slug}>
              <div className="card h-100">
                <Link
                  href={`/blog/${item.slug}`}
                 
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={item.img} className="card-img-top" alt="blog" />
                  <div className="card-body">
                    <h3 className="card-title2 hidden">{item.title2}</h3>
                    <h5 className="card-title">{item.title}</h5>

                    <p
                      className="card-text text-truncate-2"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: "1.5",
                        minHeight: "3em",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More button initially hidden unless blogs > 6 */}
        {shouldShowButton && (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-primary"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "View Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Blog;
