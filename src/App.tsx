import "./App.scss";
import { Carousel } from "@/components";

const productsDummyData = [
  {
    id: 1,
    content: {
      text: "Replace with your own content1",
    },
    imageUrl: "",
  },
  {
    id: 2,
    content: {
      text: "Replace with your own content",
    },
    imageUrl: "",
  },
  {
    id: 3,
    content: {
      text: "Replace with your own content3",
    },
    imageUrl: "",
  },
  {
    id: 4,
    content: {
      text: "Replace with your own content",
    },
    imageUrl: "",
  },
  {
    id: 5,
    content: {
      text: "Replace with your own content4",
    },
    imageUrl: "",
  },
  {
    id: 6,
    content: {
      text: "Replace with your own content5",
    },
    imageUrl: "",
  },
];

function App() {
  return (
    <div className="app">
      <Carousel
        title="Title"
        products={productsDummyData}
        navigationVariant="page-numbers-arrows-bottom-center"
        onShowAllClick={() => {
          console.log("Show all onpress event");
        }}
        description="Description"
      />
    </div>
  );
}

export default App;
