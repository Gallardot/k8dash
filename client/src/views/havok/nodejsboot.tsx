import React from 'react';
import Base from '../../components/base';
import DeleteButton from '../../components/deleteButton';
import ItemHeader from '../../components/itemHeader';
import Loading from '../../components/loading';
import PodsPanel from '../../components/podsPanel';
import MetadataFields from '../../components/metadataFields';
import {filterByBoot} from '../../utils/havok/bootFilterHelper';
import getMetrics from '../../utils/metricsHelpers';
import SaveButton from '../../components/saveButton';
import ScaleButton from '../../components/scaleButton';
import {defaultSortInfo, SortInfo} from '../../components/sorter';
import bootApi from '../../services/havok/bootApi';
import api from '../../services/api';
import {Pod, Metrics} from '../../utils/types';
import {NodeJSBoot} from '../../utils/havok/bootTypes';

type Props = {
    namespace: string;
    name: string;
}

type State = {
    item?: NodeJSBoot;
    podsSort: SortInfo;
    pods?: Pod[];
    metrics?: Metrics[];
}

const service = bootApi.nodejsboots;

export default class NodejsbootView extends Base<Props, State> {
    state:State = {
        podsSort: defaultSortInfo(x => this.setState({podsSort: x})),
    };

    componentDidMount() {
        const {namespace, name} = this.props;

        this.registerApi({
            item: service.get(namespace, name, x => this.setState({item: x})),
            pods: api.pod.list(namespace, x => this.setState({pods: x})),
            metrics: api.metrics.pods(namespace, x => this.setState({metrics: x})),
        });
    }

    render() {
        const {namespace, name} = this.props;
        const {
            pods,
            podsSort,
            item,
            metrics,
        } = this.state;

        const filteredPods = filterByBoot(pods, item);
        const filteredMetrics = getMetrics(filteredPods, metrics);

        return (
            <div id='content'>
                <ItemHeader title={['Nodejsboots', namespace, name]} ready={!!item}>
                    <>
                        <ScaleButton
                            namespace={namespace}
                            name={name}
                            scaleApi={service.scale}
                        />

                        <SaveButton
                            item={item}
                            onSave={x => service.put(x)}
                        />

                        <DeleteButton
                            onDelete={() => service.delete(namespace, name)}
                        />
                    </>
                </ItemHeader>

                <div className='contentPanel'>
                    {!item ? <Loading /> : (
                        <div>
                            <MetadataFields item={item} />
                        </div>
                    )}
                </div>

                <div className='contentPanel_header'>Pods</div>
                <PodsPanel
                    items={filteredPods}
                    sort={podsSort}
                    metrics={filteredMetrics}
                    skipNamespace={true}
                />
            </div>
        );
    }
}
