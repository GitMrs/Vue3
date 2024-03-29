const sp = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
// const request = require('request');
const headers = { 'User-Agent': ' Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1' }
class Spider {
  constructor() {
    this.url = 'https://www.xiximh.com';
    this.books = [];
    this.tags = [];
    this.init();
  }
  async init() {
    /**
     * 28978-166264
     * 28977-166263
     * https://pic.xiximh.com/static/upload/book/711/28977/1711791.jpg
     * 304 失败
     */
    // this.getBookList(this.url);
    let book = require('./book1.json');
    for (let i = 782; i < book.length; i++) {
      const elememt = book[i];
      console.log(i);
      let path = elememt.href.slice(13);
      console.log(`${elememt.title}开始`);
      await this.writeJson(elememt.menu, path);
      await sleep(2000)
      console.log(`${elememt.title}结束`);
    };
    // console.log();
    // book = await this.getBookMenu(book);
    // fs.writeFileSync('book2.json', JSON.stringify(book), 'utf-8')
    // console.log(book[0].menu);
    // this.writeJson(menu);
    // const picList = await this.getPic(this.url + '/chapter/28978-166264', '.view-main-1 img')
    // console.log(picList);
    // this.downImg('https://pic.xiximh.com/static/upload/book/711/28977/1711791.jpg');
    // const data = require('./711.json').slice(37, -1);
    // for (let i = 0; i < data.length; i++) {
    // const element = data[0];
    // const imgUrl = element.imgUrl;
    // let i = 37;
    // for (let j = 0; j < imgUrl.length; j++) {
    //   const { url } = imgUrl[j];
    //   console.log(`${element.name}的第${i + 1}章，的第${j + 1}张开始`);
    //   const msg = await this.downImg(url, imgUrl[j]);
    //   console.log(msg);
    //   console.log(`${element.name}的第${i + 1}章，的第${j + 1}张结束`);
    // }
    // }
    // fs.writeFileSync('711_base64.json', JSON.stringify(data), 'utf-8');
    // console.log(data.length);
  }
  async getBookList(url) {
    let _url = this.url + '/page=';
    let bookList = [];
    for (var i = 1; i < 26; i++) {
      _url = url + i;
      console.log(`第${i}页开始`);
      await this.getBookListJSON(_url, bookList);
      console.log(`第${i}页结束`);
    }
    console.log('开始写人');
    await fs.writeFileSync('book.json', JSON.stringify(bookList), 'utf-8');
    console.log('写人结束');
  }
  getBookListJSON(url, list) {
    return new Promise(async (resolve, reject) => {
      try {
        const $ = await this.getHtml(url);
        let info = {};
        $('.manga-list-2 li').each((index, item) => {
          info = {
            cover: item.children[1].children[1].children[1].attribs['data-original'],
            href: item.children[3].children[1].attribs['href'],
            title: item.children[3].children[1].children[0].data,
            tip: item.children[5].children[1].children[0].data,
          }
          list.push(info)
        });
        resolve(list)
      } catch (error) {
        reject(error)
      }
    });
  }
  async getBookMenu(book) {
    for (let index = 0; index < book.length; index++) {
      const element = book[index];
      console.log(`${element.title}菜单开始`);
      const menu = await this.getMenu(this.url + element.href, '.detail-list-select li');
      console.log(`${element.title}菜单结束`);
      element['menu'] = menu;
    }
    return book;
  }
  getMenu(url, target) {
    return new Promise(async (reslove, reject) => {
      try {
        let menu = [];
        const $ = await this.getHtml(url);
        $(target).each((index, item) => {
          const info = {
            url: item.children[1].attribs.href,
            name: item.children[1].children[0].data
          }
          menu.push(info)
        });
        reslove(menu);
      } catch (error) {
        reject(error)
      }
    })

  }
  getPic(url, targer, element) {
    return new Promise(async (reslove, reject) => {
      try {
        const $ = await this.getHtml(url);
        let picList = [];
        $(targer).each((index, item) => {
          let info = {
            url: item.attribs['data-original']
          }
          picList.push(info)
        })
        reslove(picList);
      } catch (error) {
        reject(error)
      }
    })
  }
  getHtml(url) {
    return new Promise(async (reslove, reject) => {
      try {
        const html = await sp.get(url).set(headers);
        // console.log(html.text);
        reslove(cheerio.load(html.text));
      } catch (error) {
        reject(error)
      }
    })
  }
  async writeJson(menu, path) {
    for (let i = 0; i < menu.length; i++) {
      const element = menu[i];
      console.log(`${element.name} 开始`);
      const imgUrl = await this.getPic(this.url + element.url, '.view-main-1 img');
      console.log(`${element.name} 结束`);
      element['imgUrl'] = imgUrl;
    }
    await fs.writeFileSync(`./json/${path}.json`, JSON.stringify(menu), 'utf-8');
  }
  async downImg(url, ele) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileName = url.split('/').pop();
        const path = url.split('/').slice(5, 8).join('/');
        if (!fs.existsSync(path)) {
          console.log('文件路径不存在，创建路径');
          fs.mkdir(path, { recursive: true }, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('文件创建成功');
            }
          });
        }
        await sp.get(url)
          .end(async (err, sres) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log('开始下载');
            await sleep(2000)
            // console.log(sres);
            //  const base64Img = 'data:image/png;base64,' + sres.body.toString('base64');
            //  ele['base64'] = base64Img;
            //  图片下载
            await fs.writeFileSync(path + '/' + fileName, sres.body, "binary", function (err) {
              if (err) {
                console.log(err);
                reject(err)
              };
            });
            resolve('下载完成')
          })
      } catch (error) {
        console.log('失败');
        reject(error)
      }
    })
  }
}
new Spider()
