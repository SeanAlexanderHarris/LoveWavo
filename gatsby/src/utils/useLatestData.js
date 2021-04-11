import { useState, useEffect } from 'react';

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // hot items
  const [hotslices, setHotSlices] = useState();

  // staff
  const [staff, setStaff] = useState();

  // use side effect to fetch data from graphql endpoint
  useEffect(function () {
    // when the component mounts, will run - fetching the data & will run if any data changes
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
                StoreSettings(id: "downtown") {
                    name
                    staffmember {
                        ${deets}
                    }
                    hotItems {
                        ${deets}
                    }
                }
            }`,
      }),
    }).then((res) =>
      res.json().then((resp) => {
        setHotSlices(resp.data.StoreSettings.hotItems);
        setStaff(resp.data.StoreSettings.staffmember);
      })
    );
  }, []);

  return {
    hotslices,
    staff,
  };
}
