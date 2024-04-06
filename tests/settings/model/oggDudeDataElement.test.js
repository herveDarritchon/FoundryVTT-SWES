import OggDudeDataElement from "../../../module/settings/models/OggDudeDataElement.mjs";

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

    describe('GroupeBy Type tests', () => {
        test('an empty list of files should return an empty object', () => {
            let oggDudeDataElements = [];
            expect(OggDudeDataElement.groupByType(oggDudeDataElements)).toMatchObject({});
        });
        test('a list of files with one image should return an object with an image attribute associated with a list of one image', () => {
            let oggDudeDataElements = [new OggDudeDataElement({name: "path/subpath/name.jpg", dir: false})];
            expect(OggDudeDataElement.groupByType(oggDudeDataElements)).toMatchObject({image: [oggDudeDataElements[0]]});
        });
        test('a list of files with two images should return an object with an image attribute associated with a list of two images', () => {
            let oggDudeDataElements = [
                new OggDudeDataElement({name: "path/subpath/name.jpg", dir: false}),
                new OggDudeDataElement({name: "path/subpath/name.webp", dir: false})
            ];
            expect(OggDudeDataElement.groupByType(oggDudeDataElements))
                .toMatchObject({
                    image: [oggDudeDataElements[0], oggDudeDataElements[1]]
                });
        });
        test('a list of files with two images and one xml should return an object with an image attribute associated with a list of two images and a xml attribut associated with a list of one xml', () => {
            let oggDudeDataElements = [
                new OggDudeDataElement({name: "path/subpath/name.jpg", dir: false}),
                new OggDudeDataElement({name: "path/subpath/name.webp", dir: false}),
                new OggDudeDataElement({name: "path/subpath/name.xml", dir: false})
            ];
            expect(OggDudeDataElement.groupByType(oggDudeDataElements))
                .toMatchObject({
                    image: [oggDudeDataElements[0], oggDudeDataElements[1]],
                    xml: [oggDudeDataElements[2]],
                });
        });
    });

    describe('GroupeBy Directory tests', () => {
        test('an empty list of files should return an empty object', () => {
            let oggDudeDataElements = [];
            expect(OggDudeDataElement.groupByDirectory(oggDudeDataElements)).toMatchObject({});
        });
        test('a list of files with only directories should return an empty object', () => {
            let oggDudeDataElements = [
                new OggDudeDataElement({name: "path/subpath", dir: true}),
                new OggDudeDataElement({name: "path/subpath", dir: true})
            ];
            expect(OggDudeDataElement.groupByDirectory(oggDudeDataElements)).toMatchObject({});
        });
        test('a list of files with one subpath should return an object with an subpath attribute associated with a list of one subpath', () => {
            let oggDudeDataElements = [new OggDudeDataElement({name: "path/subpath/name.jpg", dir: false})];
            expect(OggDudeDataElement.groupByDirectory(oggDudeDataElements)).toMatchObject({"path/subpath": [oggDudeDataElements[0]]});
        });
        test('a list of files with two subpaths should return an object with an subpath attribute associated with a list of two subpaths', () => {
            let oggDudeDataElements = [
                new OggDudeDataElement({name: "path/subpath/name.jpg", dir: false}),
                new OggDudeDataElement({name: "path/subpath/name.webp", dir: false})
            ];
            expect(OggDudeDataElement.groupByDirectory(oggDudeDataElements))
                .toMatchObject({
                    "path/subpath": [oggDudeDataElements[0], oggDudeDataElements[1]]
                });
        });
        test('a list of files with two images and one xml should return an object with an image attribute associated with a list of two images and a xml attribut associated with a list of one xml', () => {
            let oggDudeDataElements = [
                new OggDudeDataElement({name: "path/subpath/name.jpg", dir: false}),
                new OggDudeDataElement({name: "path/subpath/name.webp", dir: false}),
                new OggDudeDataElement({name: "path/subpath2/name.xml", dir: false})
            ];
            expect(OggDudeDataElement.groupByDirectory(oggDudeDataElements))
                .toMatchObject({
                    "path/subpath": [oggDudeDataElements[0], oggDudeDataElements[1]],
                    "path/subpath2": [oggDudeDataElements[2]],
                });
        });
    })
});