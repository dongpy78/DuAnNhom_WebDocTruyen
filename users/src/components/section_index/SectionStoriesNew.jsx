import { DataItem, DataItemCategory } from "./DataItem";
import SectionStoriesNewItem from "./SectionStoriesNewItem";
import SectionTitle from "../SectionTitle";
import SectionStoriesNewCategoryItem from "./SectionStoriesNewCategoryItem";

function SectionStoriesNew() {
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md-8 col-lg-9">
            <div className="section-stories-new mb-3">
              <div className="row">
                <div className="head-title-global d-flex justify-content-between mb-2">
                  <div className="col-6 col-md-4 col-lg-4 head-title-global__left d-flex align-items-center">
                    <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                      <SectionTitle title="Truyện Hot" link="#" />
                    </h2>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="section-stories-new__list">
                    {DataItem.map((data) => {
                      return <SectionStoriesNewItem key={data.id} {...data} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 col-lg-3 sticky-md-top">
            <div className="row">
              <div className="col-12">
                <div className="section-list-category bg-light p-2 rounded card-custom">
                  <div className="head-title-global mb-2">
                    <div className="col-12 col-md-12 head-title-global__left">
                      <h2 className="mb-0 border-bottom border-secondary pb-1">
                        <span
                          href="#"
                          className="d-block text-decoration-none text-dark fs-4"
                          title="Truyện đang đọc"
                        >
                          Thể loại truyện
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="row">
                    <ul className="list-category">
                      {DataItemCategory.map((data) => {
                        return (
                          <SectionStoriesNewCategoryItem
                            key={data.id}
                            {...data}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionStoriesNew;