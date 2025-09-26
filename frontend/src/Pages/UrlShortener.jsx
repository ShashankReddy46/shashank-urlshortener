import { Center, Stack, TextInput, Text, Button, Anchor } from "@mantine/core";
import React from "react";
import Service from "../utils/http"; 
import { QRCodeSVG } from "qrcode.react";

const UrlShortener = () => {
    const [originalUrl, setOriginalUrl] = React.useState("");
    const [customlink, setCustomlink] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [expiryDate, setExpiryDate] = React.useState("");
    const [shortUrlData, setShortUrlData] = React.useState(null);


    const service = new Service(); // <-- Capital S

   const getShortUrl = async () => {
  try {
    let expiresAt = null;
    if (expiryDate) {
      // Convert "YYYY-MM-DD" to full ISO string at midnight UTC
      expiresAt = new Date(expiryDate);
      if (isNaN(expiresAt.getTime())) {
        throw new Error("Invalid expiry date");
      }
      expiresAt = expiresAt.toISOString();
    }

    const response = await service.post('s', {
      customUrl: customlink,
      originalUrl,
      title,
      expiresAt,  // send the ISO string or null
    });
    console.log(response);
    setShortUrlData(response.data);
  } catch (error) {
    console.error('Error creating short URL:', error);
  }
};



    return (
        <Center style={{ height: "90vh" }}>
            <Stack
                style={{
                    borderRadius: "16px",
                    padding: "2.5rem",
                    background: "#fff",
                    width: "400px",
                }}
            >
                {!shortUrlData ? 
                    <>
                        <Text
                            size='30px'
                            style={{
                                textShadow: "2px 2px 8px rgba(0,0,0,0.18)"
                            }}
                        >
                            Short Your Url Here
                        </Text>
                        <TextInput
                            label="original url"
                            withAsterisk
                            value={originalUrl}
                            onChange={(event) => setOriginalUrl(event.currentTarget.value)}
                            radius={'md'}
                        />
                        <TextInput
                            label="Customize Your Url(optional)"
                            value={customlink}
                            onChange={(event) => setCustomlink(event.currentTarget.value)}
                            radius={'md'}
                        />
                        <TextInput
                            label="Title(optional)"
                            value={title}
                            onChange={(event) => setTitle(event.currentTarget.value)}
                            radius={'md'}
                        />
                        <TextInput
                            label="Date of Expiry(optional)"
                            value={expiryDate}
                            onChange={(event) => setExpiryDate(event.currentTarget.value)}
                            radius={'md'}
                            type="date"
                        />
                        <Button variant="outline" disabled={!originalUrl}
                            onClick={getShortUrl}>Generate and Shorten Url</Button>
                    </>
                 : 
                    <>
                        <Text>HERE IS YOUR SHORTENED URL</Text>
                        <Anchor
                            href={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`}
                        >
                            {shortUrlData?.shortCode}
                        </Anchor>
                           <QRCodeSVG
                                value={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`}
                                size={128}
                            />
                        
                    </>
                }
            </Stack>
        </Center>
    );
}

export default UrlShortener;