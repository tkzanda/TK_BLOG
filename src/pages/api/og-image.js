import { v2 as cloudinary } from "cloudinary";
import url from "url";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { title } = url.parse(req.url, true).query;

  cloudinary.config({
    cloud_name: "dtvfqdsyk",
  });

  const cloudinaryTemplateImageURL = cloudinary.url(
    "v1715470451/Tkzanda-Blog/Tkzanda-featured_iler2b.png",
    {
      width: 5000,
      height: 2752,

      transformation: [
        {
          fetch_format: "auto",
          quality: "auto",
        },
        {
          color: "#FFF",
          crop: "fit",
          width: 2690,
          overlay: {
            font_family: "Open Sans",
            font_size: "300",
            font_weight: "extra_bold",
            text: title,
          },
        },
        {
          flags: "layer_apply",
          gravity: "north_west",
          x: 325,
          y: 1240,
        },
        // {
        //   color: "#7DA9B9",
        //   crop: "fit",
        //   width: 600,
        //   overlay: {
        //     font_family: "Roboto Mono",
        //     font_size: "48",
        //     font_weight: "extra_bold",
        //     text: "guidefari.com",
        //   },
        // },
        // {
        //   flags: "layer_apply",
        //   gravity: "south_west",
        //   x: 374,
        //   y: 53,
        // },
      ],
    },
  );

  const response = await fetch(cloudinaryTemplateImageURL);
  // console.log(response);
  //const imageBuffer = Buffer.from(response.data);

  // res.setHeader("Content-Type", "image/png");
  // res.send(response);

  /*
   res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': response.length
   });
   */
  //const response = new NextResponse(cloudinaryTemplateImageURL);
  // response.headers.set('content-type', 'image/png');

  const buffer = await response.buffer();

  res.send(buffer);
}
