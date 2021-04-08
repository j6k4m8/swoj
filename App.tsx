/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

// import Clipboard from "@react-native-clipboard/clipboard";
import {Clipboard} from "react-native";

// @ts-ignore
import _ from "lodash";

const styles = StyleSheet.create({
    searchStyle: {
        height: 40,
        margin: 12,
        paddingTop: 5,
        backgroundColor: "white",
        fontSize: 23,
    },
});

type ColorObject = {
    name: string;
    hex: string;
    folders: string[];
};

class SwatchManager {
    private colors: ColorObject[];
    constructor() {
        this.colors = [
            {
                name: "JHU Cyan",
                hex: "#2196f3",
                folders: ["JHU"],
            },
            {
                name: "JHU Blue",
                hex: "#042e71",
                folders: ["JHU"],
            },
            {
                name: "Penn Navy",
                hex: "#011F5B",
                folders: ["Penn"],
            },
            {
                name: "Penn Red",
                hex: "#990000",
                folders: ["Penn"],
            },
            {
                name: "Penn Cyan",
                hex: "#82AFD3",
                folders: ["Penn"],
            },
            {
                name: "Penn Orange",
                hex: "#C35A00",
                folders: ["Penn"],
            },
            {
                name: "Penn Green",
                hex: "#008e00",
                folders: ["Penn"],
            },
            {
                name: "Penn Yellow",
                hex: "#F2C100",
                folders: ["Penn"],
            },
            {
                name: "Penn Purple",
                hex: "#4A0042",
                folders: ["Penn"],
            },
        ];
    }

    getSwatches() {
        return this.colors;
    }

    getGroupedSwatches() {
        let folders = _.uniq(
            this.getSwatches()
                .map(i => i.folders)
                .reduce((prev, cur) => [...prev, ...cur], []),
        );

        return folders.map((f: string) => [
            f,
            this.getSwatches().filter(sw => sw.folders.indexOf(f) > -1),
        ]);
    }
}

const Swatch: React.FC<{swatch: ColorObject}> = ({swatch}) => {
    return (
        <TouchableOpacity
            onLongPress={() => {
                Clipboard.setString(swatch.hex);
            }}
            style={{
                minHeight: 88,
                borderRadius: 8,
                padding: 10,
                margin: 10,
                marginTop: 0,
                backgroundColor: swatch.hex || "blue",
            }}>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                }}>
                {swatch.name}
            </Text>
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "white",
                }}>
                {swatch.hex}
            </Text>
        </TouchableOpacity>
    );
};

const swatchMatches = (swatch: ColorObject, query: string) => {
    return swatch.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
};

const SwatchFolder: React.FC<{
    swatches: ColorObject[];
    name: string;
    searchText: string;
}> = ({swatches, name, searchText}) => {
    return (
        <View>
            <Text
                style={{
                    padding: 10,
                    fontSize: 28,
                    fontWeight: "bold",
                }}>
                #{name}
            </Text>
            {(searchText
                ? swatches.filter((swatch: ColorObject) =>
                      swatchMatches(swatch, searchText),
                  )
                : swatches
            ).map((swatch: ColorObject) => (
                <Swatch key={swatch.name} swatch={swatch} />
            ))}
        </View>
    );
};

function SwojApp() {
    const [searchText, setSearchText] = useState("");
    const groupedSwatches = new SwatchManager().getGroupedSwatches();
    return (
        <View>
            <View>
                <TextInput
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={ev => {
                        setSearchText(ev);
                    }}
                    style={styles.searchStyle}
                />
            </View>
            <View>
                <ScrollView>
                    {groupedSwatches.map(([folder, swatches], n) => (
                        <SwatchFolder
                            name={folder}
                            swatches={swatches}
                            key={folder}
                            searchText={searchText}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const App = () => {
    // const isDarkMode = useColorScheme() === "dark";

    return (
        <SafeAreaView>
            <StatusBar barStyle={"light-content"} />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View>
                    <SwojApp />

                    {/* <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
        </Section> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "600",
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//   },
//   highlight: {
//     fontWeight: "700",
//   },
// });

export default App;
