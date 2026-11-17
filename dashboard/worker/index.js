const page = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="네이버 금융 ETF 시세를 운용사, 시장, 상품별로 살펴보는 라이브 대시보드">
    <title>네이버 ETF 라이브 대시보드</title>
    <style>
      :root { --ink:#17212b; --muted:#637181; --line:#dfe7ed; --paper:#f6f9fb; --panel:#fff; --navy:#122b43; --blue:#1479ce; --teal:#008a83; --red:#e0525d; --green:#007d62; font-family: Inter, Pretendard, "Noto Sans KR", Arial, sans-serif; color:var(--ink); background:var(--paper); }
      * { box-sizing:border-box; } body { margin:0; min-width:320px; } button, select, input { font:inherit; } button { cursor:pointer; }
      .shell { max-width:1440px; margin:0 auto; padding:30px 28px 54px; }
      .hero { display:flex; align-items:flex-end; justify-content:space-between; gap:20px; padding:4px 0 28px; }
      .eyebrow { color:var(--blue); font-weight:750; font-size:12px; letter-spacing:.12em; margin:0 0 9px; }
      h1 { font-size:clamp(28px,4vw,43px); line-height:1.05; letter-spacing:-.055em; margin:0; color:var(--navy); }
      .sub { color:var(--muted); margin:11px 0 0; font-size:14px; }
      .actions { display:flex; align-items:center; gap:11px; flex-wrap:wrap; justify-content:flex-end; }
      .live { display:flex; align-items:center; gap:7px; color:var(--muted); font-size:12px; white-space:nowrap; }
      .dot { width:8px; height:8px; background:#14b887; border-radius:50%; box-shadow:0 0 0 4px #dff7ef; }
      .btn { border:1px solid var(--line); background:var(--panel); color:var(--navy); border-radius:9px; padding:10px 13px; font-weight:700; font-size:13px; }
      .btn:hover { border-color:#9ac3e5; background:#f2f8fd; } .btn:disabled { cursor:wait; opacity:.65; }
      .filters { display:grid; grid-template-columns:minmax(220px,1.4fr) repeat(3,minmax(145px,.7fr)); gap:10px; padding:14px; border:1px solid var(--line); border-radius:14px; background:var(--panel); box-shadow:0 4px 18px rgba(25,58,82,.04); }
      .field { position:relative; } .field input,.field select { width:100%; height:43px; border:1px solid var(--line); border-radius:8px; padding:0 12px; background:#fff; color:var(--ink); outline:none; }
      .field input:focus,.field select:focus { border-color:var(--blue); box-shadow:0 0 0 3px #d8ecfc; }
      .section-label { margin:29px 0 11px; color:var(--muted); font-size:12px; font-weight:800; letter-spacing:.08em; }
      .metrics { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
      .metric { min-height:112px; border:1px solid var(--line); border-radius:14px; background:var(--panel); padding:17px; }
      .metric p { margin:0; color:var(--muted); font-size:12px; font-weight:700; } .metric strong { display:block; color:var(--navy); font-size:27px; margin-top:14px; letter-spacing:-.04em; }
      .metric small { color:var(--muted); font-size:11px; } .up { color:var(--red)!important; } .down { color:var(--blue)!important; }
      .layout { display:grid; grid-template-columns:1.15fr .85fr; gap:13px; }
      .card { background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:19px; }
      .card-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:17px; } .card h2 { margin:0; font-size:15px; letter-spacing:-.025em; color:var(--navy); } .hint { font-size:11px; color:var(--muted); }
      .bars { display:grid; gap:13px; } .bar-row { display:grid; grid-template-columns:88px 1fr 56px; align-items:center; gap:9px; font-size:12px; } .bar-name { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color:#475766; } .track { height:9px; overflow:hidden; background:#eaf0f4; border-radius:999px; } .fill { height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--blue),#5ca8e6); } .bar-value { text-align:right; font-variant-numeric:tabular-nums; color:var(--navy); font-weight:700; }
      .table-card { margin-top:13px; padding:0; overflow:hidden; } .table-top { display:flex; padding:17px 19px 13px; align-items:center; justify-content:space-between; gap:12px; } .table-top select { border:1px solid var(--line); padding:7px 9px; border-radius:7px; color:var(--ink); background:#fff; font-size:12px; }
      .table-wrap { overflow:auto; } table { width:100%; border-collapse:collapse; min-width:860px; } th { text-align:right; padding:11px 14px; color:var(--muted); font-size:11px; background:#f7fafc; border-top:1px solid var(--line); border-bottom:1px solid var(--line); white-space:nowrap; } th:first-child,th:nth-child(2),th:nth-child(3),th:nth-child(4) { text-align:left; } td { padding:13px 14px; font-size:13px; text-align:right; border-bottom:1px solid #edf1f3; font-variant-numeric:tabular-nums; white-space:nowrap; } td:first-child,td:nth-child(2),td:nth-child(3),td:nth-child(4) { text-align:left; } tbody tr { cursor:pointer; } tbody tr:hover { background:#f3f9fe; } .name { font-weight:800; color:var(--navy); } .tag { display:inline-block; padding:4px 7px; border-radius:5px; background:#eef4f7; color:#4b6475; font-size:11px; } .empty { padding:50px; text-align:center; color:var(--muted); }
      .note { margin:14px 2px 0; font-size:11px; line-height:1.6; color:var(--muted); } .error { display:none; margin-top:13px; padding:12px 14px; border-radius:9px; background:#fff3f3; color:#a43b43; font-size:13px; }
      dialog { max-width:530px; width:calc(100% - 36px); padding:0; border:1px solid var(--line); border-radius:16px; box-shadow:0 22px 70px rgba(5,28,48,.28); } dialog::backdrop { background:rgba(11,32,48,.38); } .dialog-inner { padding:23px; } .dialog-top { display:flex; justify-content:space-between; gap:10px; align-items:flex-start; } .dialog-title { margin:0; font-size:21px; letter-spacing:-.04em; color:var(--navy); } .close { border:0; background:#edf3f6; width:32px; height:32px; border-radius:50%; color:var(--navy); font-size:18px; } .detail-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-top:21px; } .detail { background:#f5f8fa; border-radius:9px; padding:12px; } .detail span { display:block; font-size:11px; color:var(--muted); margin-bottom:7px; } .detail b { color:var(--navy); font-size:15px; }
      @media(max-width:820px) { .shell { padding:22px 16px 40px; } .hero { align-items:flex-start; flex-direction:column; } .actions { justify-content:flex-start; } .filters { grid-template-columns:1fr 1fr; } .filters .field:first-child { grid-column:1/-1; } .metrics { grid-template-columns:repeat(2,1fr); } .layout { grid-template-columns:1fr; } }
      @media(max-width:430px) { .filters { grid-template-columns:1fr; } .filters .field:first-child { grid-column:auto; } .metric { padding:14px; } .metric strong { font-size:23px; } }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="hero">
        <div><p class="eyebrow">NAVER FINANCE · LIVE ETF MONITOR</p><h1>국내 상장 ETF, 한눈에 보기</h1><p class="sub">운용사·시장·상품 성격으로 나눠 실시간 시세와 규모를 살펴보세요.</p></div>
        <div class="actions"><label class="live"><span class="dot"></span><span id="updated">데이터 불러오는 중</span></label><button class="btn" id="refresh" type="button">새로고침</button></div>
      </header>
      <section class="filters" aria-label="ETF 필터">
        <label class="field"><input id="search" type="search" placeholder="ETF 이름 또는 종목코드 검색"></label>
        <label class="field"><select id="issuer"><option value="">전체 운용사</option></select></label>
        <label class="field"><select id="market"><option value="">전체 시장</option></select></label>
        <label class="field"><select id="product"><option value="">전체 상품</option></select></label>
      </section>
      <p class="section-label">선택 결과 요약</p>
      <section class="metrics">
        <article class="metric"><p>조회 ETF</p><strong id="count">-</strong><small>필터 적용 종목 수</small></article>
        <article class="metric"><p>시가총액 합계</p><strong id="market-sum">-</strong><small>네이버 금융 표기 기준</small></article>
        <article class="metric"><p>상승 종목</p><strong class="up" id="gain">-</strong><small>전일 대비 상승</small></article>
        <article class="metric"><p>평균 3개월 수익률</p><strong id="earn-rate">-</strong><small>단순 평균, 참고용</small></article>
      </section>
      <p class="section-label">구성 분석</p>
      <section class="layout">
        <article class="card"><div class="card-head"><h2>운용사별 시가총액</h2><span class="hint">상위 6개</span></div><div class="bars" id="issuer-bars"></div></article>
        <article class="card"><div class="card-head"><h2>상품별 종목 수</h2><span class="hint">필터 적용 기준</span></div><div class="bars" id="product-bars"></div></article>
      </section>
      <section class="card table-card">
        <div class="table-top"><div><h2>ETF 목록</h2><span class="hint" id="table-count"></span></div><label><select id="sort"><option value="marketSum">시가총액순</option><option value="changeRate">등락률순</option><option value="amonut">거래대금순</option><option value="threeMonthEarnRate">3개월 수익률순</option></select></label></div>
        <div class="table-wrap"><table><thead><tr><th>종목명</th><th>운용사</th><th>시장</th><th>상품</th><th>현재가</th><th>등락률</th><th>3개월</th><th>거래대금</th><th>시가총액</th></tr></thead><tbody id="rows"></tbody></table></div>
        <div class="empty" id="empty" hidden>조건에 맞는 ETF가 없습니다.</div>
      </section>
      <p class="note">데이터 출처: 네이버 금융 ETF 목록 API. 운용사·시장·상품 분류는 종목명과 네이버 분류 코드를 바탕으로 한 자동 분류이며, 투자 판단을 위한 정보가 아닙니다. 시가총액과 거래대금은 네이버 금융 제공 단위를 따릅니다.</p>
      <p class="error" id="error" role="alert"></p>
    </main>
    <dialog id="detail"><div class="dialog-inner"><div class="dialog-top"><div><p class="eyebrow" id="detail-code"></p><h2 class="dialog-title" id="detail-name"></h2></div><button class="close" id="close" aria-label="닫기">×</button></div><div class="detail-grid" id="detail-grid"></div></div></dialog>
    <script>
      const state = { all: [], filtered: [] };
      const won = new Intl.NumberFormat('ko-KR');
      const selectors = ['search','issuer','market','product','sort'].map(function(id){ return document.getElementById(id); });
      function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function(char){ return ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[char]; }); }
      function num(value) { return Number(value) || 0; }
      function money(value) { return won.format(num(value)); }
      function trillion(value) { const eok = num(value); return eok >= 10000 ? (eok / 10000).toFixed(eok >= 100000 ? 0 : 1) + '조원' : won.format(eok) + '억원'; }
      function signed(value, suffix) { const n = num(value); return (n > 0 ? '+' : '') + n.toFixed(suffix === '%' ? 2 : 0) + suffix; }
      function issuer(name) { const rules = [['KODEX','삼성자산운용'],['TIGER','미래에셋자산운용'],['RISE','KB자산운용'],['ACE','한국투자신탁운용'],['SOL','신한자산운용'],['HANARO','NH-Amundi자산운용'],['KOSEF','키움투자자산운용'],['TIMEFOLIO','타임폴리오자산운용'],['PLUS','한화자산운용'],['ARIRANG','한화자산운용'],['1Q','하나자산운용'],['WOORI','우리자산운용'],['UNICORN','현대자산운용'],['KINDEX','한국투자신탁운용'],['KBSTAR','KB자산운용']]; const hit = rules.find(function(rule){ return name.startsWith(rule[0]); }); return hit ? hit[1] : '기타 운용사'; }
      function market(name) { return /(미국|중국|일본|유럽|인도|글로벌|월드|베트남|홍콩|대만|브라질|멕시코|캐나다|호주|독일|프랑스|영국|러시아|선진국|신흥국|달러|엔|유로|MSCI|S&P|NASDAQ|나스닥|NYSE|필라델피아|SOX|FTSE|STOXX|항셍)/i.test(name) ? '해외' : '국내'; }
      function product(name) { if (/(레버리지|인버스|곱버스|2X|3X)/i.test(name)) return '레버리지·인버스'; if (/(머니마켓|MMF|CD금리|단기채|초단기)/i.test(name)) return '현금성·단기'; if (/(채권|국채|국고|회사채|통안|우량채)/i.test(name)) return '채권'; if (/(금현물|골드|은선물|원유|WTI|구리|농산물|천연가스)/i.test(name)) return '원자재'; if (/(리츠|REITs|부동산)/i.test(name)) return '리츠·부동산'; if (/(반도체|AI|2차전지|배터리|바이오|게임|로봇|방산|은행|금융|자동차|조선|헬스케어|전력|친환경|소프트웨어|미디어|화장품)/i.test(name)) return '테마·섹터'; return '주식형'; }
      function enrich(item) { return Object.assign({}, item, { issuer:issuer(item.itemname), market:market(item.itemname), product:product(item.itemname) }); }
      function unique(key) { return Array.from(new Set(state.all.map(function(item){ return item[key]; }))).sort(); }
      function options(id, values) { const select = document.getElementById(id); const selected = select.value; const title = id === 'issuer' ? '전체 운용사' : id === 'market' ? '전체 시장' : '전체 상품'; select.innerHTML = '<option value="">' + title + '</option>' + values.map(function(value){ return '<option value="' + escapeHtml(value) + '">' + escapeHtml(value) + '</option>'; }).join(''); select.value = selected; }
      function aggregate(items, key, measure) { const map = {}; items.forEach(function(item){ map[item[key]] = (map[item[key]] || 0) + (measure ? num(item[measure]) : 1); }); return Object.entries(map).sort(function(a,b){ return b[1]-a[1]; }); }
      function drawBars(target, data, formatter, color) { const el = document.getElementById(target); const top = data.slice(0,6); const max = top[0] ? top[0][1] : 1; el.innerHTML = top.length ? top.map(function(entry){ return '<div class="bar-row"><span class="bar-name" title="' + escapeHtml(entry[0]) + '">' + escapeHtml(entry[0]) + '</span><div class="track"><div class="fill" style="width:' + (entry[1]/max*100) + '%;background:' + color + '"></div></div><span class="bar-value">' + formatter(entry[1]) + '</span></div>'; }).join('') : '<span class="hint">표시할 데이터가 없습니다.</span>'; }
      function render() { const search = document.getElementById('search').value.trim().toLowerCase(); const filters = { issuer:document.getElementById('issuer').value, market:document.getElementById('market').value, product:document.getElementById('product').value }; const sort = document.getElementById('sort').value;
        state.filtered = state.all.filter(function(item){ return (!search || item.itemname.toLowerCase().includes(search) || item.itemcode.includes(search)) && (!filters.issuer || item.issuer === filters.issuer) && (!filters.market || item.market === filters.market) && (!filters.product || item.product === filters.product); }).sort(function(a,b){ return num(b[sort])-num(a[sort]); });
        const items = state.filtered, gains = items.filter(function(item){ return num(item.changeRate) > 0; }).length, average = items.length ? items.reduce(function(sum,item){ return sum + num(item.threeMonthEarnRate); },0)/items.length : 0;
        document.getElementById('count').textContent = won.format(items.length) + '개'; document.getElementById('market-sum').textContent = trillion(items.reduce(function(sum,item){ return sum + num(item.marketSum); },0)); document.getElementById('gain').textContent = won.format(gains) + '개'; const earn = document.getElementById('earn-rate'); earn.textContent = signed(average,'%'); earn.className = average > 0 ? 'up' : average < 0 ? 'down' : '';
        drawBars('issuer-bars', aggregate(items,'issuer','marketSum'), trillion, 'linear-gradient(90deg,#1479ce,#69b5ec)'); drawBars('product-bars', aggregate(items,'product'), function(v){ return won.format(v) + '개'; }, 'linear-gradient(90deg,#008a83,#5ac5b5)'); document.getElementById('table-count').textContent = '상위 ' + Math.min(items.length,80) + '개 표시';
        const rows = document.getElementById('rows'); rows.innerHTML = items.slice(0,80).map(function(item,index){ const change = num(item.changeRate); return '<tr data-index="' + index + '"><td><span class="name">' + escapeHtml(item.itemname) + '</span><br><span class="hint">' + item.itemcode + '</span></td><td>' + escapeHtml(item.issuer) + '</td><td><span class="tag">' + item.market + '</span></td><td><span class="tag">' + item.product + '</span></td><td>' + money(item.nowVal) + '원</td><td class="' + (change > 0 ? 'up' : change < 0 ? 'down' : '') + '">' + signed(change,'%') + '</td><td class="' + (num(item.threeMonthEarnRate) > 0 ? 'up' : num(item.threeMonthEarnRate) < 0 ? 'down' : '') + '">' + signed(item.threeMonthEarnRate,'%') + '</td><td>' + money(item.amonut) + '백만</td><td>' + trillion(item.marketSum) + '</td></tr>'; }).join(''); document.getElementById('empty').hidden = Boolean(items.length); }
      function showDetail(index) { const item = state.filtered[index]; if (!item) return; document.getElementById('detail-code').textContent = item.itemcode + ' · ' + item.issuer; document.getElementById('detail-name').textContent = item.itemname; const details = [['현재가',money(item.nowVal)+'원'],['NAV',money(item.nav)+'원'],['전일 대비',signed(item.changeRate,'%')],['3개월 수익률',signed(item.threeMonthEarnRate,'%')],['거래량',money(item.quant)+'주'],['거래대금',money(item.amonut)+'백만'],['시가총액',trillion(item.marketSum)],['분류',item.market+' · '+item.product]]; document.getElementById('detail-grid').innerHTML = details.map(function(detail){ return '<div class="detail"><span>'+detail[0]+'</span><b>'+detail[1]+'</b></div>'; }).join(''); document.getElementById('detail').showModal(); }
      async function load() { const button = document.getElementById('refresh'); const error = document.getElementById('error'); button.disabled = true; button.textContent = '불러오는 중'; error.style.display = 'none'; try { const response = await fetch('/api/etfs', { cache:'no-store' }); if (!response.ok) throw new Error('데이터를 가져오지 못했습니다.'); const payload = await response.json(); state.all = payload.items.map(enrich); options('issuer',unique('issuer')); options('market',unique('market')); options('product',unique('product')); render(); document.getElementById('updated').textContent = '업데이트 ' + new Date(payload.fetchedAt).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}); } catch (err) { error.textContent = err.message + ' 잠시 후 다시 시도해 주세요.'; error.style.display = 'block'; } finally { button.disabled = false; button.textContent = '새로고침'; } }
      selectors.forEach(function(el){ el.addEventListener(el.id === 'search' ? 'input' : 'change', render); }); document.getElementById('refresh').addEventListener('click',load); document.getElementById('rows').addEventListener('click',function(event){ const row = event.target.closest('tr'); if (row) showDetail(Number(row.dataset.index)); }); document.getElementById('close').addEventListener('click',function(){ document.getElementById('detail').close(); }); load(); setInterval(load, 60000);
    </script>
  </body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    void env;
    void ctx;

    const url = new URL(request.url);
    if (url.pathname === "/api/etfs") {
      try {
        const upstream = await fetch("https://finance.naver.com/api/sise/etfItemList.nhn", {
          headers: { "accept": "application/json, text/plain, */*", "referer": "https://finance.naver.com/sise/etf.naver" },
          cf: { cacheTtl: 0, cacheEverything: false },
        });
        if (!upstream.ok) throw new Error("Naver API responded " + upstream.status);
        const text = new TextDecoder("euc-kr").decode(await upstream.arrayBuffer());
        const data = JSON.parse(text);
        const items = data?.result?.etfItemList;
        if (!Array.isArray(items)) throw new Error("Unexpected Naver API response");
        return Response.json({ items, fetchedAt: new Date().toISOString() }, { headers: { "cache-control": "no-store" } });
      } catch (error) {
        return Response.json({ error: "ETF data is temporarily unavailable" }, { status: 502, headers: { "cache-control": "no-store" } });
      }
    }
    if (url.pathname !== "/") return new Response("Not found", { status: 404 });

    return new Response(page, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};
