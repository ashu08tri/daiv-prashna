import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import lineageDataRaw from "../Lineage.json";

const cloneAndCollapse = (node, depth = 0, maxDepth = 1, collapse = false) => {
    const newNode = { ...node };
    if (newNode.sub) {
        newNode.children = newNode.sub.map(child =>
            cloneAndCollapse(child, depth + 1, maxDepth, collapse)
        );
        if (collapse && depth >= maxDepth) {
            newNode._children = newNode.children;
            newNode.children = null;
        }
    }
    return newNode;
};

const LineageTree = () => {
    const svgRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [rootData, setRootData] = useState(() =>
        cloneAndCollapse(lineageDataRaw, 0, 1)
    );

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!rootData) return;

        const { width, height } = dimensions;
        const svgElement = d3.select(svgRef.current);
        svgElement.selectAll("*").remove();

        const root = d3.hierarchy(rootData, d => d.children);
        const topLevelChildrenCount = root.children ? root.children.length : 0;
        const xSpacing = topLevelChildrenCount <= 2 ? 80 : 140;
        const ySpacing = 220;
        const treeLayout = d3.tree().nodeSize([xSpacing, ySpacing]);

        treeLayout(root);
        root.each(d => {
            if (d.parent) {
                const index = d.parent.children.indexOf(d);
                d.y += index * 20;
            }
        });

        const allNodes = root.descendants();
        const treeWidth = d3.max(allNodes, d => d.x) + 600;
        const treeHeight = d3.max(allNodes, d => d.y) + 200;

        svgElement
            .attr("viewBox", `0 0 ${treeWidth} ${treeHeight}`)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .style("width", "100%")
            .style("height", `${treeHeight}px`);

        const svg = svgElement
            .append("g")
            .attr("transform", `translate(${treeWidth / 2 - root.x}, 50)`);

        const IMAGE_RADIUS = 35;
        const TEXT_PADDING = 20;

        // LINK DRAWING ANIMATION
        const links = svg
            .selectAll("path.link")
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "#808080")
            .attr("stroke-width", 2)
            .attr("d", d => {
                const sourceY = d.source.y + 80; 
                return d3.linkVertical()
                    .x(d2 => d2.x)
                    .y(d2 => d2 === d.source ? sourceY : d2.y)(d);
            })
            .attr("stroke-dasharray", function () {
                return this.getTotalLength();
            })
            .attr("stroke-dashoffset", function () {
                return this.getTotalLength();
            })
            .transition()
            .duration(800)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        // NODES
        const nodes = svg
            .selectAll("g.node")
            .data(allNodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .style("opacity", 0);

        nodes
            .transition()
            .delay((d, i) => i * 100)
            .duration(500)
            .style("opacity", 1);

      
            nodes.on("click", function (event, d) {
                if (d.data.children) {
                    d.data._children = d.data.children;
                    d.data.children = null;
                } else if (d.data._children) {
                    d.data.children = d.data._children;
                    d.data._children = null;
                }
                setRootData({ ...rootData });
            });
        

        nodes.append("circle")
            .attr("r", 35)
            .attr("fill", "#f0f0f0")
            .attr("stroke", "#aaa");

        nodes.append("image")
            .attr("href", d => d.data.image)
            .attr("width", 80)
            .attr("height", 80)
            .attr("x", -35)
            .attr("y", -35)
            .attr("clip-path", "circle(35px at 35px 35px)");

            nodes.append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#3f0808")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .each(function (d) {
                const fullName = d.data.name;
                const match = fullName.match(/^([^(]+)\s*(\([^)]+\))?/);
                const nameLine = match ? match[1].trim() : fullName;
                const bracketLine = match && match[2] ? match[2].trim() : null;
        
                const text = d3.select(this);
                text.append("tspan")
                    .attr("x", 0)
                    .attr("y", 55)
                    .text(nameLine);
        
                if (bracketLine) {
                    text.append("tspan")
                        .attr("x", 0)
                        .attr("dy", "1.2em")
                        .text(bracketLine);
                }
            });        
    }, [dimensions, rootData]);

    return (
        <div
            ref={containerRef}
            style={{
                overflowX: "scroll",
                width: "120%",
                overflowY: "hidden",
                background: "#fffff0",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
        >
            <svg ref={svgRef} />
        </div>
    );
};

export default LineageTree;
