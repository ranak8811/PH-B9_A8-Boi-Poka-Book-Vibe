import bannerImg from "../../assets/books.jpg";

const Banner = () => {
  return (
    <div className="hero bg-base-200 px-6 lg:px-10 py-16 mt-8">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-40">
        <img
          src={bannerImg}
          className="max-w-sm w-full rounded-lg shadow-2xl"
        />
        <div className="space-y-8">
          <h1 className="text-5xl font-bold playfair-font">
            Books to freshen up <br /> your bookshelf
          </h1>

          <button className="btn bg-[#23BE0A] text-white">View The List</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
