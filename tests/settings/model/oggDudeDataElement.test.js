import {OggDudeDataElement} from "../../../module/settings/models/OggDudeDataElement.js";

/**
 * @jest-environment jsdom
 */
describe('OggDudeDataElement tests', () => {
    describe('File type tests', () => {
        test('zip entry of directory should return an element of type directory', () => {
            let oggDudeDataElement = new OggDudeDataElement({name: "path/subpath", dir: true});
            expect(oggDudeDataElement.isDir()).toBe(true);
            expect(oggDudeDataElement.isXml()).toBe(false);
            expect(oggDudeDataElement.isImage()).toBe(false);
            expect(oggDudeDataElement.name).toBe("");
        });
        describe('zip entry of file type is', () => {
            test('image should return an element of type image', () => {
                let oggDudeDataElement = new OggDudeDataElement({name: "path/name.jpg", dir: false});
                expect(oggDudeDataElement.isDir()).toBe(false);
                expect(oggDudeDataElement.isXml()).toBe(false);
                expect(oggDudeDataElement.isImage()).toBe(true);
                expect(oggDudeDataElement.name).toBe("name.jpg");
            });
            test('xml should return an element of type xml', () => {
                let oggDudeDataElement = new OggDudeDataElement({name: "path/name.xml", dir: false});
                expect(oggDudeDataElement.isDir()).toBe(false);
                expect(oggDudeDataElement.isImage()).toBe(false);
                expect(oggDudeDataElement.isXml()).toBe(true);
                expect(oggDudeDataElement.name).toBe("name.xml");
            });
        });
    });
    describe('Relative path tests', () => {
        test('a file should return the relative path of the file in the zip without the filename', () => {
            let oggDudeDataElement = new OggDudeDataElement({name: "path/subpath/name.ext", dir: false});
            expect(oggDudeDataElement.isDir()).toBe(false);
            expect(oggDudeDataElement.relativePath).toBe("path/subpath");
            expect(oggDudeDataElement.fullPath).toBe("path/subpath/name.ext");
            expect(oggDudeDataElement.name).toBe("name.ext");
        });
        test('a directory should return the relative path of the file in the zip without the filename', () => {
            let oggDudeDataElement = new OggDudeDataElement({name: "path/subpath", dir: true});
            expect(oggDudeDataElement.isDir()).toBe(true);
            expect(oggDudeDataElement.relativePath).toBe("path/subpath");
            expect(oggDudeDataElement.fullPath).toBe("path/subpath");
            expect(oggDudeDataElement.name).toBe("");
        })
    });
});