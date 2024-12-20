import { makeAutoObservable, toJS, runInAction } from "mobx";
import axios from "axios";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase"; // Assuming you have a firebase.js file for Firebase config
import { io } from "socket.io-client";

class SelectionPageStore {
  restaurants = [
    {
      business_status: "OPERATIONAL",
      formatted_address: "238 G St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5447678,
          lng: -121.7389368,
        },
        viewport: {
          northeast: {
            lat: 38.54586012989272,
            lng: -121.7376684701073,
          },
          southwest: {
            lat: 38.54316047010727,
            lng: -121.7403681298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Woodstock's Pizza Davis",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 438,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/108685095535692167150">Woodstock&#39;s Pizza</a>',
          ],
          photo_reference:
            "AelY_CvUAsrilSL2ej58QATyqlcMFkW2zcLeckqH9QSOH9rIReqb8PB_JCp3mk16pKesDLXfBc94V-8G0py2VJZKQv6HEqm-8jjk1Wj7y6m4cB4VwzK6uSvkMfYSvJgAcNq7bCoUuma5giJFB6W58S5m3qpNlVlQy09WotAtJnyagEDLMOQk",
          width: 1148,
        },
      ],
      place_id: "ChIJ7S3xg3MphYAR5PDBO_23l-I",
      plus_code: {
        compound_code: "G7V6+WC Davis, California",
        global_code: "84CWG7V6+WC",
      },
      price_level: 2,
      rating: 4.4,
      reference: "ChIJ7S3xg3MphYAR5PDBO_23l-I",
      types: [
        "meal_delivery",
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 1765,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "1260 Lake Blvd #113, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.55378109999999,
          lng: -121.7868007,
        },
        viewport: {
          northeast: {
            lat: 38.55512252989272,
            lng: -121.7855156201073,
          },
          southwest: {
            lat: 38.55242287010727,
            lng: -121.7882152798928,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Lamppost Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 720,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/110525672386099540419">Eric Zitzmann</a>',
          ],
          photo_reference:
            "AelY_CsaOulyNoeptKXg2QGSPqGSCh9NadrLqKZIhrqtTnaPcF0GKVPAgy9_Xxs0jqHa5dXPyTaK03ZcUl64u94OmKbOFP9kmwTXf67ETqI922ndVDwLgwhVyIue7Qcp3I4hVk9HaCXurHwUkixgjL7POoeznnceKtyvmK7PvFlEoxCutj2B",
          width: 1280,
        },
      ],
      place_id: "ChIJq21S-j8ohYARHJGIcQjWfO4",
      plus_code: {
        compound_code: "H637+G7 Davis, California",
        global_code: "84CWH637+G7",
      },
      price_level: 2,
      rating: 4.5,
      reference: "ChIJq21S-j8ohYARHJGIcQjWfO4",
      types: [
        "meal_delivery",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 382,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "1300 E Covell Blvd B, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5608657,
          lng: -121.7346743,
        },
        viewport: {
          northeast: {
            lat: 38.56226272989272,
            lng: -121.7332862701073,
          },
          southwest: {
            lat: 38.55956307010727,
            lng: -121.7359859298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Cenario's Pizza of Davis",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107753704745254648428">Travis Falls</a>',
          ],
          photo_reference:
            "AelY_Cs7EvTqAQhOjvfMqiyy9iIpoKb9FfBwd_h5WImvwhwGYgfVYQIY4rbqyqwZFhLgXX9VRfyZWpic8KZhTbR0crci8gsLJogXbWFtU_Kjucgxp-vYT0EljW8ZQ5uQQ0U1RDSaEN_hoV7W_xlI3GFYQYrUcf2t_SK81CoxP5wURzILW2-e",
          width: 3024,
        },
      ],
      place_id: "ChIJK8OAk5AphYARHDoFj8gLL7U",
      plus_code: {
        compound_code: "H768+84 Davis, California",
        global_code: "84CWH768+84",
      },
      price_level: 1,
      rating: 4.2,
      reference: "ChIJK8OAk5AphYARHDoFj8gLL7U",
      types: [
        "meal_delivery",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 102,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "212 F St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5439092,
          lng: -121.7398256,
        },
        viewport: {
          northeast: {
            lat: 38.54524717989273,
            lng: -121.7386080701073,
          },
          southwest: {
            lat: 38.54254752010728,
            lng: -121.7413077298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Blaze Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 2988,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109270265268622072281">Jessica D</a>',
          ],
          photo_reference:
            "AelY_CsQ2bKrXbnOYSQFcTwwm-47aUHEb-ge7EiAaD74mxTD6gE8wMuxW122gcfEWWVevdsCtZhqNFT6ARpjLecTsHZzNlrtiliVD4xeC-3tb3x1DMXnKGgvMxH17b68DTdJk76s_CkvxSUzExscdSYXXNOcmkfC20wAl2GMnAeK-wohvU4W",
          width: 5312,
        },
      ],
      place_id: "ChIJ83ZseXMphYARUGWBLYCF1pQ",
      plus_code: {
        compound_code: "G7V6+H3 Davis, California",
        global_code: "84CWG7V6+H3",
      },
      price_level: 1,
      rating: 4.4,
      reference: "ChIJ83ZseXMphYARUGWBLYCF1pQ",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 742,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "314 F St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5453037,
          lng: -121.7401974,
        },
        viewport: {
          northeast: {
            lat: 38.54665192989272,
            lng: -121.7389250701072,
          },
          southwest: {
            lat: 38.54395227010728,
            lng: -121.7416247298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Steve's Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1536,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109076020224520200417">A Google User</a>',
          ],
          photo_reference:
            "AelY_Ctd6SEzPVReHtfaKDxqC-O9YH2BmOwzqZtvvvCaMyZs7rRY_U0bG-o2IO76ZO99e4o1h7AvlljykU16Kia7H0RjUxt1OCN5wSdcVm1PqsfqrbXd-UJippORWUxp8nk9AuMro6kexHhFdN_2IT_jV5bU8l_X2MEKfR0TiKo23rV4v3Bp",
          width: 2048,
        },
      ],
      place_id: "ChIJ85hRjXQphYARN8itwty2hFg",
      plus_code: {
        compound_code: "G7W5+4W Davis, California",
        global_code: "84CWG7W5+4W",
      },
      price_level: 2,
      rating: 4.2,
      reference: "ChIJ85hRjXQphYARN8itwty2hFg",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 352,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "505 L St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5486974,
          lng: -121.7349762,
        },
        viewport: {
          northeast: {
            lat: 38.55007862989272,
            lng: -121.7335124701073,
          },
          southwest: {
            lat: 38.54737897010728,
            lng: -121.7362121298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Pizza Guys",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3265,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107372207644686885699">Pizza Guys</a>',
          ],
          photo_reference:
            "AelY_Ctt7nCicIIcr8T39YMkpaF-bX0qLZASL6PVQ25Z2h92zK2q8P2fBgniLa8HMwNEyblAOSWj41kffmsaY6T7HFn1InMEc4aj9j7RUDrNupRVDaSQZJDz6LkhHzsDXy3VHkuTECDtSHDgktmYONlEYClii7e8miSuxRtZ2FBzBbnn1iku",
          width: 4898,
        },
      ],
      place_id: "ChIJT9yzWnYphYARtbZFkHkxFi8",
      plus_code: {
        compound_code: "G7X8+F2 Davis, California",
        global_code: "84CWG7X8+F2",
      },
      price_level: 1,
      rating: 4.2,
      reference: "ChIJT9yzWnYphYARtbZFkHkxFi8",
      types: [
        "meal_delivery",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 112,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "226 F St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5444251,
          lng: -121.7399355,
        },
        viewport: {
          northeast: {
            lat: 38.54575232989271,
            lng: -121.7387339701073,
          },
          southwest: {
            lat: 38.54305267010727,
            lng: -121.7414336298928,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Mamma",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 5378,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/105194757370524491471">A Google User</a>',
          ],
          photo_reference:
            "AelY_Ct7-nWm4areDQbYKpGxLnJc8EkeLobMw0g0xrcQFB4XL-rXaTR25H_o46EZrmo_HA-Y99Gpgd9y0LhqYIyLFpi6xX56PQcuThi2fUh6l31T9d5DuXQIqQc2Su1YDdVcded46gOcG5vsF5g58nm4dGAuilr7BQWmCDc5AYGDjQPOtoIs",
          width: 8067,
        },
      ],
      place_id: "ChIJiSuiDXcphYARZdGfamVWKL4",
      plus_code: {
        compound_code: "G7V6+Q2 Davis, California",
        global_code: "84CWG7V6+Q2",
      },
      price_level: 2,
      rating: 4,
      reference: "ChIJiSuiDXcphYARZdGfamVWKL4",
      types: [
        "cafe",
        "meal_takeaway",
        "bar",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 219,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "139 G St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5433203,
          lng: -121.7390342,
        },
        viewport: {
          northeast: {
            lat: 38.54462007989272,
            lng: -121.7375751201073,
          },
          southwest: {
            lat: 38.54192042010727,
            lng: -121.7402747798927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Paesanos",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 2988,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112673079197349732516">L G</a>',
          ],
          photo_reference:
            "AelY_CsTUcGZCjZQyBGLQ9eac0ec4e7zhh0J5-rM3YexraVSl3YcH_7r8pznRkiatALG98v6HEpQln83cGmRAj9YUr3Xo_lGCoI120yGV_cGsb6dDPlZ5SO_9MobopzoOCS_Lp-zlf7iJCFJ8s33hM-F_i_3IdJge4bG2c79kt60f6w5JEeK",
          width: 5312,
        },
      ],
      place_id: "ChIJkUhmonMphYARMcwrjCo4fgs",
      plus_code: {
        compound_code: "G7V6+89 Davis, California",
        global_code: "84CWG7V6+89",
      },
      price_level: 2,
      rating: 4.3,
      reference: "ChIJkUhmonMphYARMcwrjCo4fgs",
      types: [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 955,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "1411 W Covell Blvd Suite 111, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5623936,
          lng: -121.765375,
        },
        viewport: {
          northeast: {
            lat: 38.56372687989272,
            lng: -121.7640627201073,
          },
          southwest: {
            lat: 38.56102722010727,
            lng: -121.7667623798927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Mountain Mike's Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 698,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/113858485808385422396">A Google User</a>',
          ],
          photo_reference:
            "AelY_CuY79QCxJnUu0hMA2cbDoUGm1leq7OZcrt80M6B7NpGY9_FS_Ghh-YQEECjyHFnMGSmZRCiK37D0zlINf3QLX1txEaGapc_0vu427dAqg_ZTy5-pshftKfqBchcpiFMqIBelrhLEeI3cBEYiHjlAMGnQw4N0vKRAGjQ6jc-i5qvQeLt",
          width: 697,
        },
      ],
      place_id: "ChIJhSvOQAIphYARfMCCmQlq85A",
      plus_code: {
        compound_code: "H66M+XV Davis, California",
        global_code: "84CWH66M+XV",
      },
      price_level: 2,
      rating: 4.1,
      reference: "ChIJhSvOQAIphYARfMCCmQlq85A",
      types: [
        "meal_delivery",
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 95,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "236 B St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5438013,
          lng: -121.7443504,
        },
        viewport: {
          northeast: {
            lat: 38.54525072989271,
            lng: -121.7430365701073,
          },
          southwest: {
            lat: 38.54255107010727,
            lng: -121.7457362298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Pizza & Pints",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/108332499721030098491">A Google User</a>',
          ],
          photo_reference:
            "AelY_CtYZ538c_tAQxS_Z28FhshIE_GaiCGiaFasOvF7bXu5bMXxJr-DTwfapyUP4C6ed0alOM9d7TANc2ZuhxjtvElwJ5aevobh_VDfHNMReR6v2bJ9B7JHkw3YM3r0O72Fl2u2sgINjvFW1GkCZyONvhETjiaDHePRSEK1xWDADcKQk4IC",
          width: 3024,
        },
      ],
      place_id: "ChIJBaf_g5cphYAR7IKv3wq6RyA",
      plus_code: {
        compound_code: "G7V4+G7 Davis, California",
        global_code: "84CWG7V4+G7",
      },
      price_level: 2,
      rating: 4.4,
      reference: "ChIJBaf_g5cphYAR7IKv3wq6RyA",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 252,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "1620 E 8th St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5527276,
          lng: -121.7311416,
        },
        viewport: {
          northeast: {
            lat: 38.55417342989272,
            lng: -121.7298573201073,
          },
          southwest: {
            lat: 38.55147377010728,
            lng: -121.7325569798927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Symposium",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 3072,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/102700243513925473503">Brian Gee</a>',
          ],
          photo_reference:
            "AelY_CvBedAz8o4LTZ_xHTN5hMs6B-1tcPVtEOb9ORx2w5XPI7yFakdwfoWH1CUUEj_YgyV8MaEBjYMTpAqzVUmv62gYOZFiPCqFqI9KRDNsXsKfrI5UYxFhupFrfwJFRKr1nLRwcwKtgK5IU2ri9lATueyJPzsADZshII-nc7QabWDI3jNX",
          width: 4080,
        },
      ],
      place_id: "ChIJjUDAL50phYARTXiqwCVxMVA",
      plus_code: {
        compound_code: "H739+3G Davis, California",
        global_code: "84CWH739+3G",
      },
      price_level: 2,
      rating: 4.5,
      reference: "ChIJjUDAL50phYARTXiqwCVxMVA",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 272,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "Chamber of Commerce, 814 2nd St, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.543578,
          lng: -121.7383826,
        },
        viewport: {
          northeast: {
            lat: 38.54499982989272,
            lng: -121.7370457201073,
          },
          southwest: {
            lat: 38.54230017010727,
            lng: -121.7397453798928,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Village Bakery",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 2864,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/102162446611253680894">Joseph</a>',
          ],
          photo_reference:
            "AelY_CuBRNJ1otrNplAdbjnhG2op4HyGIEdF8bv68Y0pV3BTJteFJ0a2SOuwAczHtSeO-C0mmYhhj_DfY8BsYLq8pIn692bYU33A-NElLmbWDsN3e1StT5KZyoPqr3onRoiHCtM1EIUCviZDfiUI-QgpUvHYWZPmvvTKfPnEfd5O80ncKNRF",
          width: 3982,
        },
      ],
      place_id: "ChIJe5Zil3MphYARQNLYrdf6BU0",
      plus_code: {
        compound_code: "G7V6+CJ Davis, California",
        global_code: "84CWG7V6+CJ",
      },
      price_level: 1,
      rating: 4.5,
      reference: "ChIJe5Zil3MphYARQNLYrdf6BU0",
      types: ["bakery", "store", "food", "point_of_interest", "establishment"],
      user_ratings_total: 192,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "302 Davis St, San Leandro, CA 94577, United States",
      geometry: {
        location: {
          lat: 37.72552,
          lng: -122.15836,
        },
        viewport: {
          northeast: {
            lat: 37.72669677989272,
            lng: -122.1570866201073,
          },
          southwest: {
            lat: 37.72399712010728,
            lng: -122.1597862798927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Mountain Mike's Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 698,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/113875495970228162026">Mountain Mike&#39;s Pizza - San Leandro</a>',
          ],
          photo_reference:
            "AelY_CtupPz4R4I8I84PKCEiFPSFcbu2JLIdMjuYLsrlFLeHlt6EGqlMfB7DFm7TtsoIkN-H7b_NT__0286o9OZS4PflRBCtSYebpX6XS2CH2E3Kv3zR17DUsQcIGaEAafY-FtFbTIsGx0gvwoAXVvXViqn0fcuo6YJSn4ORriN5-mflRxlg",
          width: 697,
        },
      ],
      place_id: "ChIJ62h-KJGPj4ARgFzRBV2TXcI",
      plus_code: {
        compound_code: "PRGR+6M San Leandro, California",
        global_code: "849VPRGR+6M",
      },
      price_level: 2,
      rating: 4.2,
      reference: "ChIJ62h-KJGPj4ARgFzRBV2TXcI",
      types: [
        "meal_delivery",
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 337,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "1340 E Covell Blvd, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5608121,
          lng: -121.7341583,
        },
        viewport: {
          northeast: {
            lat: 38.56216192989272,
            lng: -121.7328084701073,
          },
          southwest: {
            lat: 38.55946227010728,
            lng: -121.7355081298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Little Caesars Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1000,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/118382155123959511314">Little Caesars Pizza</a>',
          ],
          photo_reference:
            "AelY_Cv0JFxSX0_-S57TS_vVs_Kg-CeyXp4ytVmE-drjRgvWjosaEB71Nad_hyz4hU-bHjJSqq9Ia1LyIwX1jMtHpS9jPOx_XhIx8kd6kw4Myoud-XDdRJtCGn88ZWRjWMcV5v_Yadh1T6ToLL_Y3KNjYHzBReP4n-W1_EnWqs_gyroyalQA",
          width: 1000,
        },
      ],
      place_id: "ChIJlwKRiJAphYARMhXkl-jR680",
      plus_code: {
        compound_code: "H768+88 Davis, California",
        global_code: "84CWH768+88",
      },
      price_level: 1,
      rating: 4.1,
      reference: "ChIJlwKRiJAphYARMhXkl-jR680",
      types: [
        "meal_delivery",
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 174,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "2657 Portage Bay E #8, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.54843049999999,
          lng: -121.782322,
        },
        viewport: {
          northeast: {
            lat: 38.54979607989272,
            lng: -121.7810405201073,
          },
          southwest: {
            lat: 38.54709642010727,
            lng: -121.7837401798927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Osteria Fasulo",
      opening_hours: {
        open_now: false,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/111341279917845825041">Brad Johnson</a>',
          ],
          photo_reference:
            "AelY_CvICBGdqVq4FB3fx08JqhY36GmVubDO6Oo9x_Wr_K1diTV8UnSPRyUTkkYIklG-7c32KufUk7tPvHQCl2hI13ap_BxVt9RJf5f0kY2CHndfo_dMikH59eESgtde5PMSXQmd9ga1rHRwsV2gFg6P-88vHzd9rsHKJ-U75dcSBZXcBS_0",
          width: 3024,
        },
      ],
      place_id: "ChIJ_9xzmUMohYARYFtnesnyQHY",
      plus_code: {
        compound_code: "G6X9+93 Davis, California",
        global_code: "84CWG6X9+93",
      },
      price_level: 2,
      rating: 4.3,
      reference: "ChIJ_9xzmUMohYARYFtnesnyQHY",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 257,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "4120 Chiles Rd Unit B, Davis, CA 95618, United States",
      geometry: {
        location: {
          lat: 38.5503683,
          lng: -121.7014745,
        },
        viewport: {
          northeast: {
            lat: 38.55179052989271,
            lng: -121.7001209701072,
          },
          southwest: {
            lat: 38.54909087010727,
            lng: -121.7028206298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Domino's Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/111051004178321502442">Parmesh Joshi</a>',
          ],
          photo_reference:
            "AelY_Cv1JyQnzPyaAPkWCRq34AIrH9sBruW0PchE53wLSuPbrYjSdUAF7N1IhuHl-FOD-B0D10qavcUqk1zJMsqZ4X_1hm1D0LFWlXV1wE5WFzOaN1IJ8Lw5Ar6XuGThCS_Sfeh8PVESbdi76xfwyHbo1lZc3xp9jdmCVzwWlu3QRZEXFu2c",
          width: 4032,
        },
      ],
      place_id: "ChIJeYm1FsYrhYARhJMAnKcRH3A",
      plus_code: {
        compound_code: "H72X+4C Davis, California",
        global_code: "84CWH72X+4C",
      },
      price_level: 1,
      rating: 3.9,
      reference: "ChIJeYm1FsYrhYARhJMAnKcRH3A",
      types: [
        "meal_delivery",
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 207,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "1254 Davis St, San Leandro, CA 94577, United States",
      geometry: {
        location: {
          lat: 37.721684,
          lng: -122.1694946,
        },
        viewport: {
          northeast: {
            lat: 37.72289932989272,
            lng: -122.1687174201073,
          },
          southwest: {
            lat: 37.72019967010727,
            lng: -122.1714170798927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Little Caesars Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1000,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/100751370563000947648">Little Caesars Pizza</a>',
          ],
          photo_reference:
            "AelY_CuUCnEbHKv7sGcQMs-Nt2PIstYB7hPC8Fou1z2QnnHdy5sFCi1D5v8fqeZJeESJu4qSOBULpBYiaUpEsmzbJjf7RmVigDauziBxIr8KfxbLVjFcsmw4Bngz1rV4IXt0ju9PXKjzzeVPHjFDxF4eaueOAtt2Q862NOVFEHlDSeTgYSRT",
          width: 1000,
        },
      ],
      place_id: "ChIJtypkMImPj4ARzNJu0gIfUOk",
      plus_code: {
        compound_code: "PRCJ+M6 San Leandro, California",
        global_code: "849VPRCJ+M6",
      },
      price_level: 1,
      rating: 3.8,
      reference: "ChIJtypkMImPj4ARzNJu0gIfUOk",
      types: [
        "meal_delivery",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 451,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "640 W Covell Blvd Suite G, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5598117,
          lng: -121.7573094,
        },
        viewport: {
          northeast: {
            lat: 38.56124927989272,
            lng: -121.7558832701073,
          },
          southwest: {
            lat: 38.55854962010728,
            lng: -121.7585829298927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Papa Murphy's | Take 'N' Bake Pizza",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/116968588477948079921">Papa Murphy&#39;s | Take &#39;N&#39; Bake Pizza</a>',
          ],
          photo_reference:
            "AelY_CtremnP0tHosSWCf10udyn0xnb33n6TDcoywFHLmnhsiM-0tvMmSBGvAgvlbA1ExOpVhXLNDwgq01DK_AI5-rOuv34pw7FwvnO1EAp7QbD6peyCLkRwFZ3rNCsRwKhEF-CmNwUGm5OJdXhHz4BRBObG9YlQFmC6geNcxaCNteRaypw",
          width: 1024,
        },
      ],
      place_id: "ChIJmcBpWrYphYARvVAm8HUaS5Y",
      plus_code: {
        compound_code: "H65V+W3 Davis, California",
        global_code: "84CWH65V+W3",
      },
      price_level: 1,
      rating: 4,
      reference: "ChIJmcBpWrYphYARvVAm8HUaS5Y",
      types: [
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 51,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address: "500 1st St Ste 13a, Davis, CA 95616, United States",
      geometry: {
        location: {
          lat: 38.5410871,
          lng: -121.7405353,
        },
        viewport: {
          northeast: {
            lat: 38.54236087989273,
            lng: -121.7393043201073,
          },
          southwest: {
            lat: 38.53966122010728,
            lng: -121.7420039798927,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Square Pie Guys at Local Kitchens",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 8610,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/118289506579517309455">A Google User</a>',
          ],
          photo_reference:
            "AelY_Csc7Anrjw03Z1pqju5RqB3FWrxHS4ubv5V6RWv0byGdsRJcoqh4-yZSBwaUK9lUefdQdNaowJRnzeY0AeCzeNVaPVnTE15eseBhlfgzhFAntXcGNBhAs01tI67usABM8HkUFNVdDiD7qbln_86g21RBLNfojazoMDEIHr90vXewyLtt",
          width: 2940,
        },
      ],
      place_id: "ChIJVRzqYYsphYARjBoTxuH4Kyc",
      plus_code: {
        compound_code: "G7R5+CQ Davis, California",
        global_code: "84CWG7R5+CQ",
      },
      rating: 0,
      reference: "ChIJVRzqYYsphYARjBoTxuH4Kyc",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 0,
    },
  ];

  selectedRestaurants = [];

  status = "idle";

  cache = {};

  location = "";
  searchTerm = "";

  previousLocation = "";
  previousSearchTerm = "";

  socket = null;
  userCount = 0;

  username = "";
  sessionId = null;
  userList = [];

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== "undefined" && !this.socket) {
      this.socket = io("http://localhost:3000");
      this.setupSocketListeners();
    }

    if (typeof window) {
      window.selectionPageStore = this;
      window.toJS = toJS;
    }
  }

  get gameRef() {
    if (!this.sessionId) {
      return null;
    }

    return doc(db, "games", this.sessionId);
  }

  get notReadyUsers() {
    return this.userList.filter((user) => !user.ready);
  }

  setupSocketListeners() {
    if (this.socket) {
      this.removeSocketListeners();

      this.socket.on("connect", () => {
        runInAction(() => {
          console.log("received on connect socket");
          this.userId = this.socket.id; // Store the current user's socket ID on connection
        });
      });

      this.socket.on("updateRestaurants", (restaurants) => {
        runInAction(() => {
          this.restaurants = restaurants;
        });
      });

      this.socket.on("startSelection", () => {
        console.log("Selection Started");
        runInAction(() => {
          this.status = "selection"; // Update store status if needed
        });
        window.location.href = `/game/${this.sessionId}`; // Navigate to the selection page
      });

      this.socket.on("updateUserList", (userList) => {
        runInAction(() => {
          console.log("received on updateUserList socket");

          this.userList = userList;
        });
      });

      this.socket.on("userCountUpdate", ({ numUsers }) => {
        console.log("Received userCount update", numUsers);
        runInAction(() => {
          this.userCount = numUsers;
        });
      });

      this.socket.on("voteUpdate", ({ restaurantId, voteChange }) => {
        const restaurantIndex = this.selectedRestaurants.findIndex(
          (res) => res.place_id === restaurantId
        );
        if (restaurantIndex !== -1) {
          runInAction(() => {
            this.selectedRestaurants[restaurantIndex].votes += voteChange;
          });
        }
      });
    }
  }

  removeSocketListeners() {
    if (this.socket) {
      this.socket.off("userCountUpdate");
      this.socket.off("voteUpdate");
    }
  }

  joinSession(sessionId) {
    this.setSessionId(sessionId);

    if (this.socket) {
      this.socket.emit("joinSession", sessionId);
    }
  }

  setSessionId(value) {
    this.sessionId = value;
  }

  setReadyStatus() {
    if (this.socket && this.sessionId) {
      this.socket.emit("markReady", this.sessionId);
    }
  }

  setUsername(username) {
    this.username = username;
    if (this.socket && this.sessionId) {
      this.socket.emit("setUsername", { sessionId: this.sessionId, username });
    }
  }

  cleanup() {
    this.removeSocketListeners();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  setSearchTerm(term) {
    this.searchTerm = term;
  }

  setLocation(location) {
    this.location = location;
  }

  setRestaurants = (restaurants) => {
    this.restaurants = restaurants;
  };

  addRestaurant(restaurant) {
    if (this.socket) {
      this.socket.emit("addRestaurant", {
        sessionId: this.sessionId,
        restaurant,
      });
    }
  }

  removeRestaurant(restaurantId) {
    if (this.socket) {
      this.socket.emit("removeRestaurant", {
        sessionId: this.sessionId,
        restaurantId,
      });
    }
  }

  handleSelectedRestaurants = (restaurant) => {
    const index = this.selectedRestaurants.findIndex(
      (res) => res.place_id == restaurant.place_id
    );

    if (index == -1) {
      const { name, price_level, photos, rating, place_id, formatted_address } =
        restaurant;

      this.addRestaurant({
        name,
        price_level,
        photos,
        rating,
        place_id,
        formatted_address,
        votes: 0,
      });
    } else {
      this.removeRestaurant(restaurant.place_id);
    }
  };

  async updateVotes(restaurantId, voteChange) {
    try {
      await updateDoc(this.gameRef, {
        [`restaurants.${restaurantId}.votes`]: increment(voteChange),
      });

      if (this.socket) {
        this.socket.emit("vote", {
          sessionId: this.sessionId,
          restaurantId,
          voteChange,
        });
      }
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  }

  searchRestaurants = async () => {
    this.previousLocation = this.location;
    this.previousSearchTerm = this.searchTerm;

    const cacheKey = `${this.searchTerm}-${this.location}`;
    if (this.cache[cacheKey]) {
      console.log("Fetching from cache");
      this.restaurants = this.cache[cacheKey];
    } else {
      try {
        console.log("Not in cache, fetching from google");
        const response = await axios.post("/api/search", {
          term: this.searchTerm,
          location: this.location,
        });
        restaurantData = response.data.results.map((restaurant) => {
          const {} = restaurant;

          return {};
        });
        this.restaurants = response.data.results;
        this.cache[cacheKey] = response.data.results; // Store results in cache

        console.log(toJS(this.restaurants));
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
  };

  async startWaitingRoom() {
    //TODO SHOULD I KEEP THIS LOGIC OR NOT. MAYBE USERS ALWAYS HAVE TO MAKE CUSTOM ID
    if (!this.sessionId) {
      const randomSessionId = this.createId();
      this.setSessionId(randomSessionId);
    }

    try {
      await setDoc(this.gameRef, {
        status: "waiting", // Indicates the game is waiting for restaurants to be added
        restaurants: {}, // Empty array initially
      });
    } catch (error) {
      console.error("Error moving to waiting stage:", error);
      runInAction(() => {
        this.status = "error";
      });
    }
  }

  async startSelection() {
    try {
      await setDoc(this.gameRef, {
        status: "selection", // Indicates the game is waiting for restaurants to be added
        restaurants: {}, // Empty array initially
      });

      if (this.socket) {
        this.socket.emit("startSelection", this.sessionId);
      }
    } catch (error) {
      console.error("Error moving to selection stage:", error);
      runInAction(() => {
        this.status = "error";
      });
    }
  }

  async startVoting() {
    if (this.restaurants.length > 0) {
      // Sanitize selectedRestaurants data
      const sanitizedRestaurants = this.selectedRestaurants.map(
        (restaurant) => {
          const sanitizedRestaurant = {};
          for (const key in restaurant) {
            if (restaurant[key] !== undefined) {
              sanitizedRestaurant[key] = restaurant[key];
            } else {
              sanitizedRestaurant[key] = "NA";
            }
          }
          return sanitizedRestaurant;
        }
      );

      const restaurantsObj = sanitizedRestaurants.reduce((acc, restaurant) => {
        acc[restaurant.place_id] = restaurant;
        return acc;
      }, {});

      try {
        await setDoc(this.gameRef, {
          status: "started",
          restaurants: restaurantsObj,
        });

        runInAction(() => {
          this.status = "started";
        });
      } catch (error) {
        console.error("Error starting game:", error);
        runInAction(() => {
          this.status = "error";
        });
      }
    } else {
      alert("Must have at least one restaurant to begin");
    }
  }

  get unselectedRestaurants() {
    return this.restaurants.filter(
      (restaurant) =>
        !this.selectedRestaurants.some(
          (selectedRestaurant) =>
            selectedRestaurant.place_id === restaurant.place_id
        )
    );
  }

  createId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 22 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  }

  getPhotoUrl(photoReference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
  }
}

const selectionPageStore = new SelectionPageStore();
export default selectionPageStore;
