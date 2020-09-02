import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {


  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const datas = await axios.get("http://localhost:4000/melon");
      setData(datas.data);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data === null) {
    return <div>Load..</div>;
  } else {
    console.log(data);
    return (
      <div>
        {data.map((element) => (
          <>
            <div>
                {element.rank}위: {element.image} : {element.title} : {element.artist}
            </div>
            <br />
          </>
        ))}
      </div>
    );
  }
};

export default App;