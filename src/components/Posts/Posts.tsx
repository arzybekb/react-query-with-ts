import { FC, useState } from "react";
import { useQuery } from "react-query";
import postsServices from "../../api/posts";
import Posts from "../../types/types";
const PostsUI: FC = () => {
  const [getId, setGetId] = useState("");
  const [getTitle, setGetTitle] = useState("");

  const [getResult, setGetResult] = useState<Posts[]>([]);

  const { refetch: getAllTutorials } = useQuery<Posts[], Error>(
    "query-tutorials",
    async () => {
      return await postsServices.findAllPosts();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setGetResult(res);
      },
      onError: (err: any) => {
        setGetResult(err.response?.data || err);
      },
    }
  );

  function getAllData() {
    try {
      getAllTutorials();
    } catch (err) {
      alert("Whoops!");
    }
  }

  const clearGetOutput = () => {
    setGetResult([]);
  };
  return (
    <div id="app" className="container">
      <div className="card">
        <div className="card-header">React Query Axios Typescript GET</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>
              Get All
            </button>

            <input
              type="text"
              value={getId}
              onChange={(e) => setGetId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary">Get by Id</button>
            </div>

            <input
              type="text"
              value={getTitle}
              onChange={(e) => setGetTitle(e.target.value)}
              className="form-control ml-2"
              placeholder="Title"
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary">Find By Title</button>
            </div>

            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearGetOutput}
            >
              Clear
            </button>
          </div>

          {getResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{getResult.map((el: Posts) => el.body)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsUI;
