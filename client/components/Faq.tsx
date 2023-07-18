import Link from "next/link";
import toast from "react-hot-toast";
import { BsTwitter } from "react-icons/bs";

const Faq = () => {
  const shareTweet = `https://twitter.com/intent/tweet?text=Just receive my DEN Token. Get yours now at&url=${process.env.NEXT_PUBLIC_HOST_URL}.%0A%0A&screen_name=DenTokenFaucet&hashtags=dentokenfaucet,blockchain,erc20`;
  return (
    <div className="hero bg-base-200 py-8">
      <div className="hero-content">
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              What is this project about?
            </div>
            <div className="collapse-content">
              <p>
                This project consists of two components. The first involves
                developing an ERC20 standard token by leveraging Solidity and
                extending the OpenZeppelin ERC20 contract such as ERC20Capped to
                cap the maximum token to 10 million tokens. Ethers.js is used to
                link the frontend and the smart contract. The second component
                is a faucet that grants users free tokens upon their request.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              What is cryptocurrency and token?
            </div>
            <div className="collapse-content">
              <p>
                A cryptocurrency is a digital currency that uses cryptography to
                secure and verify its transactions, recording them in a
                decentralised and immutable ledger known as blockchain.
                Cryptocurrencies can be divided into two categories: those that
                are supported by their own blockchains, like Ethereum and
                Bitcoin (BTC), and those that are built on top of other
                blockchains, also known as tokens. Tokens can be traded or held
                like any other cryptocurrency. It can also be used for exchanges
                or buying rare items in video games.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              How to get free DEN token?
            </div>
            <div className="collapse-content">
              <p>
                To request for free token, simply connect with your wallet, and
                hit “SEND ME DEN”. You can request 50 DEN every 24h!
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Where can I use DEN token?
            </div>
            <div className="collapse-content">
              <p>
                As of now there is nothing you can do with the token. I am
                thinking of developing a web3 game or minting NFTs. Stay tune
                for the upcoming news! Want to collabrate? contact me via Email
                or Linkedin (see below).
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              There's a bug on the website?
            </div>
            <div className="collapse-content">
              <p>You can contact me via Email or Linkedin (see below).</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              The faucet confirmed that it sent me test tokens, but I do not see
              them in my wallet. Why is that?
            </div>
            <div className="collapse-content">
              <p>
                In order to see the token in your waller, you first need to
                import the token by pasting the token address
                <button
                  className="mx-2 btn btn-sm bg-base-300"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "0x7C622077887E60259a4131b9287EbA5c014f716C"
                    );
                    toast.success("Copied to clipboard");
                  }}
                >
                  0x7C622077887E60259a4131b9287EbA5c014f716C
                </button>{" "}
                in Asset - Import tokens - Token contract address (Metamask).
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              It worked! How do I support you?
            </div>
            <div className="collapse-content">
              <p>
                Share your experience with a{" "}
                <Link
                  target={"_blank"}
                  href={shareTweet}
                  className="mx-2 btn btn-sm bg-base-300"
                >
                  <BsTwitter /> Tweet
                </Link>
                If you have extra DEN to donate, you can donate at
                <button
                  className="mx-2 btn btn-sm bg-base-300"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "0x7C622077887E60259a4131b9287EbA5c014f716C"
                    );
                    toast.success("Copied to clipboard");
                  }}
                >
                  0x7C622077887E60259a4131b9287EbA5c014f716C
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
