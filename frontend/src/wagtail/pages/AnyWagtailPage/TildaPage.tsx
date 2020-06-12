import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Page } from '~/components';
import { TildaPageQuery } from './queries.generated';

type Props = TildaPageQuery['tildaPage'];

const HeightContainer = styled.div`
  min-height: 100vh;
`;
const Container = styled.div<{ show: boolean }>`
  display: ${props => (props.show ? 'block' : 'none')};

  *,
  ::after,
  ::before {
    box-sizing: content-box;
  }
`;

function onLoadStyles() {
  const w = window as any;
  console.log(`${w.tildaStylesLoaded} / ${w.tildaStylesTotal}`);
  w.tildaStylesLoaded++;
  if (w.tildaStylesLoaded !== w.tildaStylesTotal) {
    return;
  }

  const el = window.document.getElementById('tilda-container');
  if (!el) {
    return; // huh?
  }
  el.style.display = 'block';
}

const TildaPage: React.FC<Props> = props => {
  const [patchedBody, inlineScripts] = useMemo(() => {
    const inlineScripts: string[] = [];

    const trimmedBody = props.body.replace(
      /<!--(header|footer)-->(.|\n|\r)*<!--\/\1-->/g,
      ''
    );
    const patchedBody = trimmedBody.replace(
      /<script\s+type="text\/javascript">([^<]*)<\/script>/g,
      (match: string, p1: string) => {
        inlineScripts.push(p1);
        return '';
      }
    );

    const patchedScripts = inlineScripts.map(script =>
      script.replace(/\$\(document\).ready\(/, 'tildaCustomReady(')
    );

    return [patchedBody, patchedScripts];
  }, [props.body]);

  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];
    let loaded = 0;
    const onload = () => {
      loaded++;
      if (loaded === scripts.length) {
        (window as any).tildaCustomReady = function tildaCustomReady(
          code: () => void
        ) {
          code();
        }.bind(window);

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
        // If you use the eval function indirectly, by invoking it via a reference other than eval, as of ECMAScript 5 it works in the global scope rather than the local scope.
        const globalEval = eval;

        for (const inlineScript of inlineScripts) {
          globalEval(inlineScript);
        }
      }
    };

    for (const js of props.js) {
      const script = document.createElement('script');
      script.src = js.url;
      script.async = false; // necessary, see https://javascript.info/script-async-defer#dynamic-scripts
      script.onerror = onload;
      script.onload = onload;

      document.body.appendChild(script);
      scripts.push(script);
    }

    return () => {
      for (const script of scripts) {
        document.body.removeChild(script);
      }
    };
  }, [props.js, inlineScripts]);

  if (typeof window !== 'undefined') {
    (window as any).tildaStylesLoaded = 0;
    (window as any).tildaStylesTotal = props.css.length;
    (window as any).onLoadStyles = onLoadStyles;
  }

  return (
    <>
      <Head>
        {props.css.map(asset => (
          <link
            rel="stylesheet"
            href={asset.url}
            key={asset.url}
            onLoad="onLoadStyles()"
            onError="onLoadStyles()"
          />
        ))}
      </Head>
      <Page title={props.title}>
        <HeightContainer>
          <Container
            dangerouslySetInnerHTML={{ __html: patchedBody }}
            id="tilda-container"
            show={false}
          />
        </HeightContainer>
      </Page>
    </>
  );
};

export default TildaPage;
